import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "../utilityComponents/Lib";
import './Tag.css';

import { getTagById } from '../../redux/selectors';

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.handleAddTag = this.handleAddTag.bind(this);
    }

    componentDidMount() {
        // this.focusInput();
    }

    componentDidUpdate() {
        // this.focusInput();
    }

    render() {
        const { name, colour } = this.props
        //TODO: use the colour for styling;
    return <div>{name}</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const tag = getTagById(state, ownProps.id);
    return tag;
}

const mapDispatchToProps = { /* updateItem - idk what should actually be here */ }

Tag.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    colour: PropTypes.string, // TODO:: use this
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
