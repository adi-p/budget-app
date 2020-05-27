import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import "../utilityComponents/Lib";
import './Item.css';

import { getItemById } from '../../redux/selectors'
import { updateItem } from '../../redux/actions';

const FIELDS = {
    name: "name",
    value: "value",
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementToFocusName: `${FIELDS.name}Input`,
        }

        this.nameInput = null;
        this.valueInput = null;

        this.focusInput = this.focusInput.bind(this);

        this.placeHolderName = `Item ${props.id}`;
        this.placeholderValue = '0';

        this.handleChange = this.handleChange.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.onValueFocus = this.onValueFocus.bind(this);
        this.setToEditMode = this.setToEditMode.bind(this);

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

    // TODO: consider more descriptive name
    handleChange(event) {
        const { id, name, value, updateItem } = this.props;
        const updatedItem = {
            ...{ id, name, value },
            [event.target.name]: event.target.value,
        };

        updateItem(updatedItem.id, updatedItem.name, updatedItem.value);
    }

    handleRemoveItem() {
        const { id, removeItem } = this.props;
        removeItem(id);
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

                onChange={this.handleChange}
                onClick={() => this.setToEditMode(FIELDS.name)}
            />
        );
        let valueElement = (
            <input type="text" name={FIELDS.value} value={this.props.value}
                placeholder={this.placeholderValue}
                ref={(ref) => { this.valueInput = ref }}
                className='textInput'

                onChange={this.handleChange}
                onClick={() => this.setToEditMode(FIELDS.value)}

                onFocus={this.onValueFocus}
            />
        );

        return (
            <tr>
                <td>
                    {nameElement}
                </td>
                <td>
                    {valueElement}
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
    const { name, value } = item;
    return { name, value };
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

    updateItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
