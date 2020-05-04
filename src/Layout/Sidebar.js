import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { withRouter } from 'react-router-dom';

import CategoryLink from "../Components/CategoryLink";
import navigation from './_nav'
import { ArrowWhiteSvg } from '../Icons';


class Sidebar extends React.Component{
    handleOnclick = () => {
        this.props.toggleSidebarOpen();
    }

    render() {
        const pathname = this.props.location.pathname;
        return <Menu right isOpen={this.props.isOpen}>
            {
                navigation.items.map(item => {
                    const selected_class = item.url === pathname? "menu-item-selected": "";
                    return <CategoryLink to={item.url} key={item.url} className="menu-item d-flex justify-content-between" onClick={this.handleOnclick}>
                        <span className={selected_class}>{item.name}</span>
                        <span><ArrowWhiteSvg/></span>
                    </CategoryLink>
                })
            }
        </Menu>
    }
}


export default withRouter(Sidebar);