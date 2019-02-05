import React, { Component } from 'react';
import Item from './Item';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            editingName: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    onBlur() {
        const id = this.props.id;
        const newName = this.state.name
        this.timeOutId = setTimeout(() => {
            //need to check category name
            this.setState({ editingName: false },
                () => this.props.updateCategoryName(id, newName));
        })
    }

    onFocus() {
        clearTimeout(this.timeOutId);
    }

    updateItem(item) {
        return this.props.updateItem(this.state.name, item);
    }



    render() {

        let nameElement;
        if (this.state.editingName) {
            nameElement = <input type="text" value={this.state.name}
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;
        } else {
            nameElement = <div onClick={() => this.setState({ editingName: true })}>{this.state.name}</div>;
        }

        const items = this.props.items.map(item => {
            return (
                <li>
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
                {/* maybe this should be a header*/}
                {nameElement}
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

export default Category;
