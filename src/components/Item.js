import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import OutsideClick from './utilityComponents/OutsideClick';
import "./utilityComponents/Lib";
import './Item.css';

import { getItemById } from '../redux/selectors'
import { updateItem } from '../redux/actions';

const FIELDS = {
    name: "name",
    value: "value",
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            elementToFocusName: `${FIELDS.name}Input`,
        }

        this.nameInput = null;
        this.valueInput = null;

        this.focusInput = this.focusInput.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onValueFocus = this.onValueFocus.bind(this);
        this.setToEditMode = this.setToEditMode.bind(this);

        this.renderInputs = this.renderInputs.bind(this);
        this.renderStatic = this.renderStatic.bind(this);
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
        if (this.state.elementToFocusName && this[this.state.elementToFocusName]) {
            this[this.state.elementToFocusName].focus();
            this.setState({
                elementToFocusName: '',
            });
        }
    }

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

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.setState({ editing: false })
        }
    }

    onValueFocus(event) {
        // select text in textbox so 0 can get overwitten
        if (this.props.value === 0) {
            event.target.select();
        }
    }

    setToEditMode(elementToFocusName) {
        this.setState({
            editing: true,
            elementToFocusName: `${elementToFocusName}Input`,
        })
    }

    renderInputs() {
        let nameElement = (<input type="text" name={FIELDS.name} value={this.props.name}
            ref={(ref) => { this.nameInput = ref }}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
        />);
        let valueElement = (<input type="text" name={FIELDS.value} value={this.props.value}
            ref={(ref) => { this.valueInput = ref }}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onFocus={this.onValueFocus}
        />);

        return (
            <OutsideClick outsideClickCallback={() => this.setState({ editing: false })}>
                {/* //maybe validate fields on exit (especially value) */}
                {nameElement} : {valueElement}
            </OutsideClick>);
    }

    renderStatic() {
        let { id, name, value } = this.props;
        name = name || `Item ${id}`; //is Id the best idea?
        value = value || 0;

        let nameElement = <div className='itemName' onClick={() => this.setToEditMode(FIELDS.name)}>{name} :</div>;
        let valueElement = <div className='itemValue' onClick={() => this.setToEditMode(FIELDS.value)}>${value}</div>;

        return (
            <div className='editableWrapper'>
                <div className='editableDiv itemInfo'>
                    {/* set to edit mode will be weird here */}
                    {nameElement}{valueElement}
                </div>
                {this.renderActions()}
            </div>);
    }

    renderActions() {
        let editAction = (<FontAwesomeIcon className='actionIcons' title='edit'
            onClick={() => this.setToEditMode(FIELDS.name)} icon='edit' />); //pen icon
        let deleteAction = (<FontAwesomeIcon className='actionIcons' title='delete'
            onClick={this.handleRemoveItem} icon='times' />); //x icon //maybe use trash can
        return <div className='itemActions'>{editAction} {deleteAction}</div>
    }




    render() {
        return this.state.editing ? this.renderInputs() : this.renderStatic();
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
