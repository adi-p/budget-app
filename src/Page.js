import React, { Component } from 'react';
import Subpage from './Subpage';

const TYPE = {
    IN = 'in',
    OUT = 'out'
}

class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            in: null,
            out: null,
            total: 0,
        }

        this.addCategory = this.addCategory.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    addCategory(subPageType, categoryName) {
        const existingCategories = Object.keys(this.state[subPageType]);
        //maybe this check should be done at the subpage level?
        if(existingCategories.includes(categoryName)){
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

    addItem(subPageType, categoryName, item) {
        //should create some kind of id for item per category?
        const subTypeState = this.state[subPageType]
        const newPartialState = {
            ...subTypeState,
            [categoryName]: [...subTypeState.items, item]
        }
        this.setState({
            [subPageType]: newPartialState
        });
    }

    render() {

        return (
            <div>
                <h1>{props.title}</h1>
                <Subpage
                    data={this.state[TYPE.OUT]}
                    addCategory={(categoryName) => this.addCategory(TYPE.OUT, categoryName)}
                    addItem={(categoryName, item) => this.addItem(TYPE.OUT, categoryName, item)}
                />
                <Subpage
                    data={this.state[TYPE.in]}
                    addCategory={(categoryName) => this.addCategory(TYPE.IN, categoryName)}
                    addItem={(categoryName, item) => this.addItem(TYPE.IN, categoryName, item)}
                />
                TOTAL : ${this.state.total}
            </div>
        );
    }
}

export default Page;
