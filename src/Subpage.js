import React, { Component } from 'react';
import Category from './Category';


class Subpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategory: null
        }

        this.idCounter = 0;

        this.addCategory = this.addCategory.bind(this);
    }

    addCategory() {
        const newCategory = {
            id: this.idCounter,
            name: `category${this.idCounter}`,
            items: [],
        };
        this.props.addCategory(newCategory);
        this.idCounter++;
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
            <div>
                <h1>{this.props.name}</h1>
                {categories}
                <button onClick={this.addCategory}>Add Category</button>
            </div>
        );
    }
}

export default Subpage;