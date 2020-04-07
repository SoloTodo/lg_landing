import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link, withRouter } from 'react-router-dom';

import navigation from './_nav'
import { ArrowSvg } from '../Icons';


class Sidebar extends React.Component{
    render() {
        const pathname = this.props.location.pathname;
        return <Menu right isOpen={this.props.isOpen}>
            {
                navigation.items.map(item => {
                    const selected_class = item.url === pathname? "menu-item-selected": "";
                    return <Link to={item.url} key={item.url} className="menu-item d-flex justify-content-between" onClick={this.props.toggleSidebarOpen}>
                        <span className={selected_class}>{item.name}</span>
                        <span><ArrowSvg/></span>
                    </Link>
                })
            }
        </Menu>
    }
}

export default withRouter(Sidebar)

