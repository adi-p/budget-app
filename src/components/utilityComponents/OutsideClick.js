import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that will trigger a call back if you click outside of it
 */
class OutsideClick extends Component {
    constructor(props) {
        super(props);

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    /**
     * Trigger callback if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.outsideClickCallback();
        }
    }

    render() {
        const { children, outsideClickCallback, ...rest } = this.props;
        return <div ref={(ref) => this.wrapperRef = ref} {...rest}>{children}</div>;
    }
}

OutsideClick.propTypes = {
    children: PropTypes.node.isRequired,
    outsideClickCallback: PropTypes.func.isRequired,
};

export default OutsideClick;