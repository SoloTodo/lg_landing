import React from 'react';
import { Button } from 'reactstrap'

import Logo from '../logo.png'
import { SbSvg, CloseSvg, SearchSvg, SearchWhiteSvg } from '../Icons';


class Header extends React.Component{
    render() {
        const Icon = this.props.isOpen? CloseSvg : SbSvg;
        const SearchIcon = this.props.isOpen? SearchWhiteSvg: SearchSvg;
        const header_class = this.props.isOpen? "header sidebar" : "header";

        return <div className={header_class}>
            <div className="header-logo">
                <img alt= "LG Logo" src={Logo}/>
            </div>
            <div className="header-search-button">
                <Button className="header-button" color="link">
                    <SearchIcon/>
                </Button>
            </div>
            <div className="bm-burger-button visible">
                <Button className="header-button" color="link" onClick={this.props.toggleSidebarOpen}>
                    <Icon/>
                </Button>
            </div>
            <div className="header-separator"/>
        </div>
    }
}

export default Header