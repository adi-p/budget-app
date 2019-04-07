import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import OutsideClick from './utilityComponents/OutsideClick';

import './Category.css';
import { sumItems } from '../util/helpers';


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            newItemName: '',
        }

        this.idCounter = 0;

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setEdit = this.setEdit.bind(this);

        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    handleChange(event) {
        this.props.updateCategoryName(event.target.value)
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

    addItem() {
        const item = { id: this.idCounter, name: `item${this.idCounter}`, value: 0 }; //Do we need a temporary name?
        this.props.addItem(item);
        this.idCounter++;
    }

    updateItem(item) {
        this.props.updateItem(item);
    }

    removeItem(item) {
        this.props.removeItem(item);
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
                <li
                    key={item.id}>
                    <Item
                        id={item.id}
                        name={item.name}
                        value={item.value}
                        updateItem={this.updateItem}
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
                <button className='deleteButton' onClick={() => this.props.removeCategory()}>Trash</button>
                <ul>
                    {items}
                    <button onClick={this.addItem}>Add Item</button>
                </ul>
                Category Total : ${sumItems(this.props.items)}
            </div>
        );
    }
}

Category.propTypes = {
    // id: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.number,
    // ]).isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array, //maybe add format at some point
    //add functions

}

export default Category;
