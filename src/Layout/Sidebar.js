import React from "react";
import { slide as Menu } from "react-burger-menu";
import { withRouter } from "react-router-dom";
import classNames from "classnames"

import CategoryLink from "../Components/CategoryLink";
import navigation from './_nav'
import {ArrowWhiteSvg, CloseSvg, SearchWhiteSvg} from "../Icons";
import Logo from "../logo.svg";
import SearchButton from "../Components/SearchButton";
import {Button} from "reactstrap";
import { isMobile } from "../utils";


class Sidebar extends React.Component{
    handleOnclick = () => {
        this.props.toggleSidebarOpen();
    };

    isMenuOpen = (state) => {
        if (this.props.isOpen !== state.isOpen){
            this.props.toggleSidebarOpen();
        }
    };

    render() {
        const pathname = this.props.location.pathname;
        return <Menu className={classNames({"mobile-menu": isMobile()}, {"desktop-menu": !isMobile()})} right isOpen={this.props.isOpen} onStateChange={this.isMenuOpen}>
            <div className={classNames("header d-flex justify-content-between align-items-center", {sidebar:this.props.isOpen})}>
                <div className="sidebar-header-logo">
                    <img alt= "LG Logo" src={Logo} width={80} height={36}/>
                </div>
                <div className="d-flex align-items-center justify-content-end flex-fill">
                    <SearchButton icon={SearchWhiteSvg} callback={this.props.toggleSidebarOpen}/>
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
                    return <CategoryLink to={item.url} key={item.url} className="menu-item d-flex justify-content-between" onClick={this.handleOnclick}>
                        <span className={classNames({"menu-item-selected":item.url === pathname})}>{item.name}</span>
                        <span><ArrowWhiteSvg/></span>
                    </CategoryLink>
                })
            }
        </Menu>
    }
}


export default withRouter(Sidebar);