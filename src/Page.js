import React, { Component } from 'react';
import Subpage from './Subpage';

const TYPE = {
    IN: 'in',
    OUT: 'out'
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [TYPE.IN]: [],
            [TYPE.OUT]: [],
        }

        this[TYPE.IN] = {
            _idCounter: 0
        }

        this[TYPE.OUT] = {
            _idCounter: 0
        }


        this.addCategory = this.addCategory.bind(this);
        this.addItem = this.addItem.bind(this);
        this.updateCategoryName = this.updateCategoryName.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    ///add a new category to the subPage
    addCategory(subPageType, categoryName) {
        const newCategory = {
            id: this[subPageType]._idCounter,
            name: categoryName,
            items: [],
        };
        this[subPageType]._idCounter++;

        this.setState({
            [subPageType]: [...this.state[subPageType], newCategory],
        },() => console.log(this.state));
    }

    ///update category name
    updateCategoryName(subPageType, categoryId, newCategoryName) {
        const newCategories = this.state[subPageType].map(c => {
            if (c.id === categoryId) {
                c.name = newCategoryName;
            }
            return c;
        });

        this.setState({
            [subPageType]: newCategories,
        },
            () => console.log(this.state));
    }

    removeCategory(subPageType, categoryId) {
        const newCategories = this.state[subPageType].filter(c => c.id !== categoryId);

        this.setState({
            [subPageType]: newCategories,
        },() => console.log(this.state));
    }

    addItem(subPageType, categoryId, item) {
        const updatedCategories = this.state[subPageType].map(c => {
            if (c.id === categoryId) {
                c.items = c.items.concat(item);
            }
            return c;
        });

        this.setState({
            [subPageType]: updatedCategories,
        });
    }

    //TODO:: need to figure out how this would work
    updateItem(subPageType, categoryId, item) {

    }

    removeItem(subPageType, categoryId, item) {
        // //should create some kind of id for item per category?
        // const subTypeState = this.state[subPageType]
        // const newPartialState = {
        //     ...subTypeState,
        //     [categoryName]: [...subTypeState.items, item]
        // }
        // this.setState({
        //     [subPageType]: newPartialState
        // });
    }

    render() {

        return (
            <div>
                <h1>{this.props.title}</h1>
                {/* maybe these subpage could be build dynamically */}
                <Subpage
                    categories={this.state[TYPE.OUT]}
                    addCategory={(categoryName) => this.addCategory(TYPE.OUT, categoryName)}
                    addItem={(categoryId, item) => this.addItem(TYPE.OUT, categoryId, item)}
                    updateCategoryName={(categoryId, newCategoryName) =>
                        this.updateCategoryName(TYPE.OUT, categoryId, newCategoryName)}
                    updateItem={(categoryId, item) => this.updateItem(TYPE.OUT, categoryId, item)}
                    removeCategory={(categoryId) => this.removeCategory(TYPE.OUT, categoryId)}
                    removeItem={(categoryId, item) => this.removeItem(TYPE.OUT, categoryId, item)}
                />
                <Subpage
                    categories={this.state[TYPE.IN]}
                    addCategory={(categoryName) => this.addCategory(TYPE.IN, categoryName)}
                    addItem={(categoryId, item) => this.addItem(TYPE.IN, categoryId, item)}
                    updateCategoryName={(categoryId, newCategoryName) =>
                        this.updateCategoryName(TYPE.IN, categoryId, newCategoryName)}
                    updateItem={(categoryId, item) => this.updateItem(TYPE.IN, categoryId, item)}
                    removeCategory={(categoryId) => this.removeCategory(TYPE.IN, categoryId)}
                    removeItem={(categoryId, item) => this.removeItem(TYPE.IN, categoryId, item)}
                />
                TOTAL : ${this.state.total}
            </div>
        );
    }
}

export default Page;
