import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Subpage from '../Subpage/Subpage';
import './Page.css';

import { getSubPageItems } from '../../redux/selectors'
import { sumItems } from '../../util/helpers';

const SUBPAGETYPE = {
    IN: 'in',
    OUT: 'out',
}

//TODO: maybe can change to a functional component
class Page extends Component {


    render() {
        return (
            <div className='column middle'>
                <h1 className='pageHeader'>{this.props.title}</h1>
                {[SUBPAGETYPE.OUT, SUBPAGETYPE.IN].map(subpageType => (
                    <Subpage
                        key={subpageType}
                        type={subpageType}
                        name={subpageType === SUBPAGETYPE.IN ? 'Money in' : 'Money out'} //temporary
                    />))}
                TOTAL : ${this.props.total} {/* Consider making 'total' a floating bar that never gets hidden */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const inItems = getSubPageItems(state, SUBPAGETYPE.IN);
    const outItems = getSubPageItems(state, SUBPAGETYPE.OUT);

    return { total: sumItems(inItems) - sumItems(outItems) };
}

Page.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number,
}

export default connect(mapStateToProps)(Page);
