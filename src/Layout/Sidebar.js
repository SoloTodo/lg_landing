import React from 'react';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu'
import { Link, withRouter } from 'react-router-dom';

import navigation from './_nav'
import { ArrowWhiteSvg } from '../Icons';
import {emptyFilters} from "../redux/actions";


class Sidebar extends React.Component{
    handleOnclick = () => {
        this.props.toggleSidebarOpen();
        this.props.emptyFilters();
    }

    render() {
        const pathname = this.props.location.pathname;
        return <Menu right isOpen={this.props.isOpen}>
            {
                navigation.items.map(item => {
                    const selected_class = item.url === pathname? "menu-item-selected": "";
                    return <Link to={item.url} key={item.url} className="menu-item d-flex justify-content-between" onClick={this.handleOnclick}>
                        <span className={selected_class}>{item.name}</span>
                        <span><ArrowWhiteSvg/></span>
                    </Link>
                })
            }
        </Menu>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        emptyFilters: () => dispatch(emptyFilters()),
    }
}


export default withRouter(connect(null, mapDispatchToProps)(Sidebar));