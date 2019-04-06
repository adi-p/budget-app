import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Category from './Category';
import './Subpage.css';

import { sumItems } from '../util/helpers';


class Subpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategory: null
        }

        this.idCounter = 0;

        this.addCategory = this.addCategory.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    addCategory() {
        const newCategory = {
            id: this.idCounter,
            name: `category${this.idCounter}`, //do we need a temporary name?
            items: [],
        };
        this.props.addCategory(newCategory);
        this.idCounter++;
    }

    calculateTotal() {
        return this.props.categories.reduce((acc, currentCategory) => {
            return acc + sumItems(currentCategory.items);
        }, 0);
    }

    render() {
        const categories = this.props.categories.map(category => {
            //TODO maybe add ordering at some point
            return (
                <Category
                    key={category.id}
                    name={category.name}
                    items={category.items}
                    total={category.total}
                    updateCategoryName={(newName) => this.props.updateCategoryName(category.id, newName)}
                    removeCategory={() => this.props.removeCategory(category.id)}
                    addItem={(item) => this.props.addItem(category.id, item)}
                    updateItem={(item) => this.props.updateItem(category.id, item)}
                    removeItem={(item) => this.props.removeItem(category.id, item)}

                />
            );
        });


        return (
            <div className='subpage'>
                <h1 className='subpageHeader'>{this.props.name}</h1>
                <div>
                    {categories}
                    <button onClick={this.addCategory}>Add Category</button>
                </div>
                <hr />
                <span>Subtotal: {this.calculateTotal()}</span>
            </div>
        );
    }
}
Category.propTypes = {
    categories: PropTypes.array, //maybe add format at some point
    //add functions
}

export default Subpage;