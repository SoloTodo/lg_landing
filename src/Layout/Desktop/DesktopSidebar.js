import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { withRouter } from 'react-router-dom';

import CategoryLink from "../../Components/Mobile/CategoryLink";
import navigation from '../_nav'
import { ArrowWhiteSvg} from "../../Icons";
import classNames from "classnames";
import Logo from "../../logo.png";
import SearchButton from "../../Components/Mobile/SearchButton";
import { Button } from "reactstrap";
import { CloseSvg, SearchWhiteSvg } from '../../Icons';


class DesktopSidebar extends React.Component{
    handleOnclick = () => {
        this.props.toggleSidebarOpen();
    }

    render() {
        const pathname = this.props.location.pathname;
        return <Menu className="desktop-menu" right isOpen={this.props.isOpen}>
            <div className={classNames("header d-flex justify-content-between", {sidebar:this.props.isOpen})} ref={(e) => { this.header = e; }}>
                <div className="header-logo">
                        <img alt= "LG Logo" src={Logo}/>
                </div>
                <div className="d-flex align-items-center justify-content-end flex-fill">
                    <SearchButton icon={SearchWhiteSvg}/>
                    <div className="header-sidebar-button d-flex align-items-center">
                        <Button className="header-button" color="link" onClick={this.props.toggleSidebarOpen}>
                            <CloseSvg/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="sidebar-separator"/>
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


export default withRouter(DesktopSidebar);