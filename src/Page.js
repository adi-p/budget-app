import React, { Component } from 'react';
import Subpage from './Subpage';

const TYPE = {
    IN = 'in',
    OUT = 'out'
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            in: null,
            out: null,
            total: 0,
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
        const existingCategories = Object.keys(this.state[subPageType]);
        //maybe this check should be done at the subpage level?
        if (existingCategories.includes(categoryName)) {
            //error?
        }
        const newPartialState = {
            ...this.state[subPageType],
            [categoryName]: null,
        }
        this.setState({
            [subPageType]: newPartialState,
        });
    }

    //TODO:: Need to decide the format of an item and the storage format for items
    // Need to think about how updating will work

    addItem(subPageType, categoryName, item) {
        //should create some kind of id for item per category?
        const subPageState = this.state[subPageType]
        const newPartialState = {
            ...subPageState,
            [categoryName]: [...subPageState[categoryName].items, item], //add item to category's items
        }
        this.setState({
            [subPageType]: newPartialState
        });
    }

    //TODO:: need to figure out how this would work
    updateCategoryName(subPageType, oldCategoryName, newCategoryName) {

    }

    //TODO:: need to figure out how this would work
    updateItem(subPageType, categoryName, item) {

    }

    removeCategory(subPageType, categoryName) {
        let newPartialState = {
            ...this.state[subPageType]
        }

        delete newPartialState[categoryName];

        this.setState({
            [subPageType]: newPartialState,
        });
    }
    removeItem(subPageType, categoryName, item) {
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
                <h1>{props.title}</h1>
                {/* maybe these subpage could be build dynamically */}
                <Subpage
                    data={this.state[TYPE.OUT]}
                    addCategory={(categoryName) => this.addCategory(TYPE.OUT, categoryName)}
                    addItem={(categoryName, item) => this.addItem(TYPE.OUT, categoryName, item)}
                    updateCategoryName={(oldCategoryName, newCategoryName) => 
                        this.updateCategoryName(TYPE.OUT, oldCategoryName, newCategoryName) }
                    updateItem={(categoryName, item) => this.updateItem(TYPE.OUT, categoryName, item)}
                    removeCategory={(categoryName) => this.removeCategory(TYPE.OUT, categoryName)}
                    removeItem={(categoryName, item) => this.removeItem(TYPE.OUT, categoryName, item)}
                />
                <Subpage
                    data={this.state[TYPE.IN]}
                    addCategory={(categoryName) => this.addCategory(TYPE.IN, categoryName)}
                    addItem={(categoryName, item) => this.addItem(TYPE.IN, categoryName, item)}
                    updateCategoryName={(oldCategoryName, newCategoryName) => 
                        this.updateCategoryName(TYPE.IN, oldCategoryName, newCategoryName) }
                    updateItem={(categoryName, item) => this.updateItem(TYPE.IN, categoryName, item)}
                    removeCategory={(categoryName) => this.removeCategory(TYPE.IN, categoryName)}
                    removeItem={(categoryName, item) => this.removeItem(TYPE.IN, categoryName, item)}
                />
                TOTAL : ${this.state.total}
            </div>
        );
    }
}

export default Page;
