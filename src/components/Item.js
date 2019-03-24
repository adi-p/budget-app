import React, { Component } from 'react';
import './Item.css';

const FIELDS = {
    name: "name",
    value: "value",
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingname: false,
            editingvalue: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    handleChange(event) {
        const currentItem = {
            id: this.props.id,
            name: this.props.name,
            value: this.props.value,
        };
        this.props.updateItem({
            ...currentItem,
            [event.target.name]: event.target.value
        })
    }

    onBlur(event) {
        // this.timeOutId = setTimeout(() => {
            const fieldName = `editing${event.target.name}`;
            this.setState({ [fieldName]: false });
        // })
    }

    onFocus() {
        // clearTimeout(this.timeOutId);
    }



    render() {

        let nameElement;
        if (this.state.editingname) {
            nameElement = <input type="text" name={FIELDS.name} value={this.props.name} 
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;
        } else {
            nameElement = <div onClick={() => this.setState({ editingname: true })}>{this.props.name}</div>;
        }

        let valueElement;
        if (this.state.editingvalue) {
            valueElement = <input type="text" name={FIELDS.value} value={this.props.value}
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;
        } else {
            valueElement = <div onClick={() => this.setState({ editingvalue: true })}>{this.props.value}</div>;
        }


        return (
            <div>
                {nameElement}
                {valueElement}
            </div>
        );
    }
}

export default Item;
