import React, { Component } from 'react';
import Category from './Category';


class Subpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategory: null
        }

        this._idCounter = 0;

        this.addCategory = this.addCategory.bind(this);
    }

    addCategory() {
        //const categoryCount = Object.keys(this.props.categories).length;
        this.props.addCategory(`category${this._idCounter}`);
        this._idCounter++;
    }

    render() {
        const categories = Object.keys(this.props.categories).map(category => {
            //TODO maybe add ordering at some point
            return (
                <Category
                    key={category.id}
                    name={category}
                    items={this.props.categories[category].items}
                    total={this.props.categories[category].total}
                    updateCategoryName={this.props.updateCategoryName}
                />
            );
        });


        return (
            <div>
                {categories}
                <button onClick={this.addCategory}>Add Category</button>
                {/* add ability to add category */}
            </div>
        );
    }
}

export default Subpage;