import React, { Component } from 'react';
import Item from './Item';
import './Category.css';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingName: false,
            newItemName: '',
        }

        this.idCounter = 0;

        this.handleChange = this.handleChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    handleChange(event) {
        this.props.updateCategoryName(event.target.value)
    }

    onBlur() {
        // this.timeOutId = setTimeout(() => {
        //need to check category name
        this.setState({ editingName: false });
        // })
    }

    onFocus() {
        // clearTimeout(this.timeOutId);
        this.setState({ editingName: true });
    }

    //** ITEM FUNCTIONS **/

    addItem() {
        const item = { id: this.idCounter, name: `item${this.idCounter}`, value: 0 };
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
        if (this.state.editingName || !this.props.name) {
            nameElement = <input type="text" value={this.props.name} placeholder='Category Name'
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;
        } else {
            nameElement = <h3 className='categoryName' onClick={() => this.setState({ editingName: true })}>{this.props.name}</h3>;
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
                {nameElement}
                <button className='deleteButton' onClick={() => this.props.removeCategory()}>Trash</button>
                <ul>
                    {items}
                    <button onClick={this.addItem}>Add Item</button>
                </ul>
            </div>
        );
    }
}

export default Category;
