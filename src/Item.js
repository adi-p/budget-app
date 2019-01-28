import React, { Component } from 'react';

const FIELDS = {
    name: "name",
    value: "value",
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            value: this.props.value,
            editingname: false,
            editingvalue: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
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

        let nameComponent;
        if (this.state.editingname) {
            nameComponent = <input type="text" name={FIELDS.name} value={this.state.name} 
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;
        } else {
            nameComponent = <div onClick={() => this.setState({ editingName: true })}>{this.state.name}</div>;
        }

        let valueComponent;
        if (this.state.editingname) {
            valueComponent = <input type="text" name={FIELDS.value} value={this.state.value} onChange={this.handleChange} 
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;
        } else {
            valueComponent = <div onClick={() => this.setState({ editingvalue: true })}>{this.state.value}</div>;
        }


        return (
            <div>
                {nameComponent}
                {valueComponent}
            </div>
        );
    }
}

export default Item;
