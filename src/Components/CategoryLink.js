import React from 'react';
import {Link} from 'react-router-dom';
import {emptyFilters} from "../redux/actions";
import {connect} from "react-redux";


class CategoryLink extends React.Component{
    handleOnClick = () => {
        this.props.emptyFilters();
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return <Link to={this.props.to} className={this.props.className} onClick={this.handleOnClick}>
            {this.props.children}
        </Link>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        emptyFilters: () => dispatch(emptyFilters()),
    }
}

export default connect(null, mapDispatchToProps)(CategoryLink);