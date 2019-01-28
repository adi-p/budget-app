import React, { Component } from 'react';
import Category from './Category';


class Subpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategory: null
        }
    }

    render() {

        const categories = Object.keys(this.props.data).map(category => {
            //TODO maybe add ordering at some point
            return (
                <Category
                    name={category}
                    items={this.props[category].items}
                    total={this.props[category].total}
                />
            );
        })

        return (
            <div>
                {categories}
                <button>Add Category</button>
                {/* add ability to add category */}
            </div>
        );
    }
}

export default Subpage;