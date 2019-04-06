import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClick from './utilityComponents/OutsideClick';
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
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onValueFocus = this.onValueFocus.bind(this);
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

    handleValueChange(event) {
        const value = Number(event.target.value);

        if (!isNaN(value)) {
            this.props.updateItem({
                id: this.props.id,
                name: this.props.name,
                [FIELDS.value]: value,
            })
        }
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



    render() {

        let nameElement;
        let valueElement;
        if (this.state.editing) {
            nameElement = (<input type="text" name={FIELDS.name} value={this.props.name}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
            />);
            valueElement = (<input type="text" name={FIELDS.value} value={this.props.value}
                onChange={this.handleValueChange}
                onKeyPress={this.handleKeyPress}
                onFocus={this.onValueFocus}
            />);
        } else {
            // try and inline these elements
            nameElement = <div className='editableDiv' onClick={() => this.setState({ editing: true })}>{this.props.name}</div>;
            valueElement = <div className='editableDiv' onClick={() => this.setState({ editing: true })}>{this.props.value}</div>;
        }


        return (
            <OutsideClick outsideClickCallback={() => this.setState({ editing: false })}
                onClick={() => this.setState({ editing: true })}>
                {nameElement}
                {valueElement}
            </OutsideClick>
        );
    }
}

Item.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
}

export default Item;
