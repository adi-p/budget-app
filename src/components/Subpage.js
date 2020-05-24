import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Category from './Category';
import './Subpage.css';

import { getSubPageItems, getSubPageCategories } from '../redux/selectors'
import { addCategory, removeCategory } from '../redux/actions';
import { sumItems } from '../util/helpers';


class Subpage extends Component {
    constructor(props) {
        super(props);
        this.handleAddCategory = this.handleAddCategory.bind(this);
        this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
    }

    handleAddCategory() {
        const { addCategory, type } = this.props;
        addCategory(type, '');
    }

    handleRemoveCategory(categoryId) {
        const { removeCategory, type } = this.props;
        removeCategory(type, categoryId);
    }

    render() {
        const categories = this.props.categories.map(category =>
            (<Category
                key={category.id}
                id={category.id}
                removeCategory={() => this.handleRemoveCategory(category.id)}
            />));

        return (
            <div className='subpage'>
                <h1 className='subpageHeader'>{this.props.name}</h1>
                <div>
                    {categories}
                    <button onClick={this.handleAddCategory}>Add Category</button>
                </div>
                <hr />
                <span>Subtotal: ${this.props.total}</span>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const categories = getSubPageCategories(state, ownProps.type);
    const items = getSubPageItems(state, ownProps.type);

    return { categories, total: sumItems(items) };
}

const mapDispatchToProps = { addCategory, removeCategory }

Subpage.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string, //should this just be called type? maybe subpageType is better? subpage id?
    categories: PropTypes.array, //maybe add format at some point
    addCategory: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Subpage);