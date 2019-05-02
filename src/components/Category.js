import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Item from './Item';
import OutsideClick from './utilityComponents/OutsideClick';

import './Category.css';
import "./utilityComponents/Lib";


import { getCategoryById, getCategoryItems } from '../redux/selectors'
import { updateCategoryName, addItem, removeItem } from '../redux/actions';
import { sumItems } from '../util/helpers';


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setEdit = this.setEdit.bind(this);

        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    handleChange(event) {
        const { updateCategoryName, id } = this.props;
        updateCategoryName(id, event.target.value);
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.setEdit(false);
        }
    }

    setEdit(value) {
        this.setState({ editing: value });
    }


    //** ITEM FUNCTIONS **/

    handleAddItem() {
        const { addItem, id } = this.props;
        addItem(id, '', 0);
    }

    handleRemoveItem(itemId) {
        const { removeItem, id } = this.props;
        removeItem(id, itemId);
    }

    render() {

        let nameElement;
        if (this.state.editing || !this.props.name) {
            nameElement = (<input type="text" value={this.props.name} placeholder='Category Name'
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
            />);
        } else {
            const displayName = this.props.name || 'Category Name';
            nameElement = <h3 className='categoryName editableDiv' onClick={() => this.setEdit(true)}>{displayName}</h3>;
        }

        const items = this.props.items.map(item => {
            return (
                <li key={item.id}>
                    <Item
                        id={item.id}
                        removeItem={() => this.handleRemoveItem(item.id)}
                    />
                </li>
            );
        });

        return (
            <div>
                {/* Need to inline name and trash button */}
                <OutsideClick className='categoryNameWrapper'
                    outsideClickCallback={() => this.setEdit(false)}
                    onClick={() => this.setEdit(true)}>
                    {nameElement}
                </OutsideClick>
                <FontAwesomeIcon className='deleteButton' title='delete'
                    onClick={this.props.removeCategory} icon='times' /> { /*//x icon //maybe use trash can */}
                <ul>
                    {items}
                    <button onClick={this.handleAddItem}>Add Item</button>
                </ul>
                Category Total : ${sumItems(this.props.items)}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const items = getCategoryItems(state, ownProps.id);
    const name = getCategoryById(state, ownProps.id).name; //check if we want this to also return items
    return { name, items };
}

const mapDispatchToProps = { updateCategoryName, addItem, removeItem }

Category.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array, //maybe add format at some point

    //functions
    updateCategoryName: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,

}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
