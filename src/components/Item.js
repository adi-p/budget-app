import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import OutsideClick from './utilityComponents/OutsideClick';
import "./utilityComponents/Lib";
import './Item.css';


const FIELDS = {
    name: "name",
    value: "value",
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onValueFocus = this.onValueFocus.bind(this);

        this.renderInputs = this.renderInputs.bind(this);
        this.renderStatic = this.renderStatic.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    handleChange(event) {
        const currentItem = {
            id: this.props.id,
            name: this.props.name,
            value: this.props.value,
        };

        this.props.updateItem({
            ...currentItem,
            [event.target.name]: event.target.value,
        })

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

    renderInputs() {
        let nameElement = (<input type="text" name={FIELDS.name} value={this.props.name}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
        />);
        let valueElement = (<input type="text" name={FIELDS.value} value={this.props.value}
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
        let nameElement = <div className='itemName' onClick={() => this.setState({ editing: true })}>{this.props.name}</div>;
        let valueElement = <div className='itemValue' onClick={() => this.setState({ editing: true })}>${this.props.value}</div>;

        return (
            <div className='editableWrapper'>
                <div className='editableDiv itemInfo' onClick={() => this.setState({ editing: true })}>
                    {nameElement} : {valueElement}
                </div>
                {this.renderActions()}
            </div>);
    }

    renderActions() {
        let editAction = (<FontAwesomeIcon className='actionIcons' title='edit'
            onClick={() => this.setState({ editing: true })} icon='edit' />); //pen icon
        let deleteAction = (<FontAwesomeIcon className='actionIcons' title='delete'
            onClick={() => this.props.removeItem()} icon='times' />); //x icon //maybe use trash can
        return <div className='itemActions'>{editAction} {deleteAction}</div>
    }




    render() {
        return this.state.editing ? this.renderInputs() : this.renderStatic();
    }
}

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

export default Item;
