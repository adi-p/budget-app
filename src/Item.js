import React, { Component } from 'react';

const FIELDS = {
    name: "name",
    value: "value",
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name, //TODO: Consider one true source of data!
            value: this.props.value, //^^
            editingname: false,
            editingvalue: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onBlur(event) {
        this.timeOutId = setTimeout(() => {
            const fieldName = `editing${event.target.name}`;
            this.setState({ [fieldName]: false },
                () => this.props.updateItem({
                    id: this.props.id,
                    name: this.state.name,
                    value: this.state.value,
                }));
        })
    }

    onFocus() {
        clearTimeout(this.timeOutId);
    }



    render() {

        let nameElement;
        if (this.state.editingname) {
            nameElement = <input type="text" name={FIELDS.name} value={this.state.name} 
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;
        } else {
            nameElement = <div onClick={() => this.setState({ editingname: true })}>{this.state.name}</div>;
        }

        let valueElement;
        if (this.state.editingvalue) {
            valueElement = <input type="text" name={FIELDS.value} value={this.state.value}
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;
        } else {
            valueElement = <div onClick={() => this.setState({ editingvalue: true })}>{this.state.value}</div>;
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
