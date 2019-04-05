import React, { Component } from 'react';
import Subpage from './Subpage';
import './Page.css';
import { sumItems } from '../util/helpers';

const TYPE = {
    IN: 'in',
    OUT: 'out',
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [TYPE.IN]: [],
            [TYPE.OUT]: [],
        }

        //*** Update category/items ***//
        this.addCategory = this.addCategory.bind(this);
        this.addItem = this.addItem.bind(this);
        this.updateCategoryName = this.updateCategoryName.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.removeItem = this.removeItem.bind(this);

        //*** Util ***//
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    //TODO consider how to reduce overlap between most of these functions

    ///add a new category to the subPage
    addCategory(subPageType, newCategory) {
        this.setState((prevState) => ({
            [subPageType]: [...prevState[subPageType], newCategory],
        }));
    }

    ///update category name
    //TODO - Could we use this to update items?
    updateCategoryName(subPageType, categoryId, newCategoryName) {
        this.setState((prevState) => {
            const newCategories = prevState[subPageType].map(c => {
                if (c.id === categoryId) {
                    c.name = newCategoryName;
                }
                return c;
            });

            return { [subPageType]: newCategories, };
        });
    }

    removeCategory(subPageType, categoryId) {
        this.setState((prevState) => {
            const newCategories = prevState[subPageType].filter(c => c.id !== categoryId);

            return {
                [subPageType]: newCategories,
            };
        });
    }

    addItem(subPageType, categoryId, item) {
        this.setState((prevState) => {
            const updatedCategories = prevState[subPageType].map(c => {
                if (c.id === categoryId) {
                    c.items = c.items.concat(item);
                }
                return c;
            });

            return {
                [subPageType]: updatedCategories,
            };
        });
    }

    updateItem(subPageType, categoryId, updatedItem) {
        this.setState((prevState) => {
            const updatedCategories = prevState[subPageType].map(c => {
                if (c.id === categoryId) {
                    c.items = c.items.map(item => {
                        if (item.id === updatedItem.id) {
                            return updatedItem;
                        }
                        return item;
                    });
                }
                return c;
            });

            return {
                [subPageType]: updatedCategories,
            };
        });
    }

    removeItem(subPageType, categoryId, item) {
        this.setState((prevState) => {
            const updatedCategories = prevState[subPageType].map(c => {
                if (c.id === categoryId) {
                    c.items = c.items.filter(i => i.id !== item.id);
                }
                return c;
            });

            return {
                [subPageType]: updatedCategories,
            };
        });
    }

    calculateTotal() {
        let subPageTotals = {};
        [TYPE.OUT, TYPE.IN]
            .forEach(type => {
                const typeValue = this.state[type].reduce((acc, currentCategory) => {
                    return acc + sumItems(currentCategory.items);
                }, 0);
                subPageTotals[type] = typeValue;
            });
        return subPageTotals[TYPE.IN] - subPageTotals[TYPE.OUT];
    }

    render() {

        console.log(this.state);
        return (
            <div className='column middle'>
                <h1 className='pageHeader'>{this.props.title}</h1>
                {[TYPE.OUT, TYPE.IN].map(type => (
                    <Subpage
                        key={type}
                        name={type === TYPE.IN ? 'Money in' : 'Money out'} //temporary
                        categories={this.state[type]}
                        addCategory={(categoryName) => this.addCategory(type, categoryName)}
                        addItem={(categoryId, item) => this.addItem(type, categoryId, item)}
                        updateCategoryName={(categoryId, newCategoryName) =>
                            this.updateCategoryName(type, categoryId, newCategoryName)}
                        updateItem={(categoryId, item) => this.updateItem(type, categoryId, item)}
                        removeCategory={(categoryId) => this.removeCategory(type, categoryId)}
                        removeItem={(categoryId, item) => this.removeItem(type, categoryId, item)}
                    />))}
                TOTAL : ${this.calculateTotal()}
            </div>
        );
    }
}

export default Page;
