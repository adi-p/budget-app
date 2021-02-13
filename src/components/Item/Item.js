import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';
import "../utilityComponents/Lib";
import './Item.css';

import { getItemById } from '../../redux/selectors'
import { updateItem } from '../../redux/actions';

const FIELDS = {
    name: "name",
    value: "value",
    tags: "tags",
}
//TODO: update/change the focus behaviour for the value field -  the references and referencing by name seem weird to do.

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementToFocusName: `${FIELDS.name}Input`,
        }

        this.nameInput = null;
        this.valueInput = null;
        this.tagsElement = null;

        this.focusInput = this.focusInput.bind(this);

        this.placeHolderName = `Item ${props.id}`;
        this.placeholderValue = '0';

        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.onValueFocus = this.onValueFocus.bind(this);
        this.setToEditMode = this.setToEditMode.bind(this);

        this.handleAddTag = this.handleAddTag.bind(this);

        this.renderInputs = this.renderInputs.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    componentDidMount() {
        this.focusInput();
    }

    componentDidUpdate() {
        this.focusInput();
    }


    //set focus to input that was clicked when starting edit
    focusInput() {
        if (this.state.elementToFocusName) {
            let el = this[this.state.elementToFocusName];
            if(el) {
                el.focus();
                this.setState({
                    elementToFocusName: '',
                });
            }
        }
    }

    handleItemChange(event) {
        const { id, name, value, tags, updateItem } = this.props;
        const updatedItem = {
            ...{ id, name, value, tags, },
            [event.target.name]: event.target.value,
        };
        // NOTE:: I don't like this pattern. It's easy to forget to update both updatedItem and the line bellow.
        updateItem(updatedItem.id, updatedItem.name, updatedItem.value, updatedItem.tags);
    }

    handleRemoveItem() {
        const { id, removeItem } = this.props;
        removeItem(id);
    }

    handleAddTag() {
        // this.tagsElement.insert
    }

    onValueFocus(event) {
        // select text in textbox so 0 can get overwitten
        if (this.props.value === 0) {
            event.target.select();
        }
    }

    setToEditMode(elementToFocusName) {
        this.setState({
            elementToFocusName: `${elementToFocusName}Input`,
        })
    }

    renderInputs() {
        let nameElement = (
            <input type="text" name={FIELDS.name} value={this.props.name}
                placeholder={this.placeHolderName}
                ref={(ref) => { this.nameInput = ref }}
                className='textInput'

                onChange={this.handleItemChange}
                onClick={() => this.setToEditMode(FIELDS.name)}
            />
        );
        let valueElement = (
            <input type="text" name={FIELDS.value} value={this.props.value}
                placeholder={this.placeholderValue}
                ref={(ref) => { this.valueInput = ref }}
                className='textInput'

                onChange={this.handleItemChange}
                onClick={() => this.setToEditMode(FIELDS.value)}

                onFocus={this.onValueFocus}
            />
        );

        let tagsElement;
        
        if(this.props.tags && this.props.tags.length) {
            tagsElement = (this.props.tags.map(t => <Tag key={t.id} id={t.id} />));
        } else {
            tagsElement = <p> No tags </p>
        }
        
       
        return (
            <tr>
                <td>
                    {nameElement}
                </td>
                <td>
                    {valueElement}
                </td>
                <td ref={(ref) => { this.tagsElement = ref }}>
                    {tagsElement}
                </td>
                <td>
                    <button onClick={() => this.handleAddTag()} >Add Tag </button>
                </td>
                <td>{this.renderActions()}</td>
            </tr>
        );
    }


    renderActions() {
        let deleteAction = (
            <button onClick={this.handleRemoveItem}>
                <FontAwesomeIcon className='actionIcons' title='delete' icon='trash-alt' />
            </button>
            ); //trash can icon
        return <>{deleteAction}</>
    }




    render() {
        return this.renderInputs();
    }
}

const mapStateToProps = (state, ownProps) => {
    const item = getItemById(state, ownProps.id);
    return item;
}

const mapDispatchToProps = { updateItem }

Item.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    tags: PropTypes.array,

    updateItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
