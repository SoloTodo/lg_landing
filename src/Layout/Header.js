import React from 'react';
import { Button } from 'reactstrap'
import classNames from "classnames"
import scrollToComponent from 'react-scroll-to-component';

import CategoryLink from "../Components/CategoryLink";
import SearchButton from "../Components/SearchButton";
import { SbSvg, CloseSvg, SearchSvg, SearchWhiteSvg } from '../Icons';
import Logo from '../logo.png'


class Header extends React.Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isOpen !== prevProps.isOpen) {
            scrollToComponent(this.header, {offset: 0, align: "top", duration: 1});
        }
    }

    render() {
        const Icon = this.props.isOpen? CloseSvg : SbSvg;
        const SearchIcon = this.props.isOpen? SearchWhiteSvg: SearchSvg;

        return <div className={classNames("header", {sidebar:this.props.isOpen})} ref={(e) => { this.header = e; }}>
                <div className="header-logo">
                    <CategoryLink to="/">
                        <img alt= "LG Logo" src={Logo}/>
                    </CategoryLink>
                </div>
            <div className="d-flex align-items-center">
                <SearchButton icon={SearchIcon}/>
                <div className="bm-burger-button visible">
                    <Button className="header-button" color="link" onClick={this.props.toggleSidebarOpen}>
                        <Icon/>
                    </Button>
                </div>
            </div>
            <div className="header-separator"/>
        </div>
    }
}

export default Header