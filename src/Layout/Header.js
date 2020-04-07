import React from 'react';
import { Button } from 'reactstrap'
import { withRouter } from 'react-router-dom';

import { SbSvg, CloseSvg, SearchSvg, SearchWhiteSvg } from '../Icons';
import cyberPng from '../cyber.png'


class Header extends React.Component{
    render() {
        const Icon = this.props.isOpen? CloseSvg : SbSvg;
        const SearchIcon = this.props.isOpen? SearchWhiteSvg: SearchSvg;
        const small_header = ['/search', '/free_delivery'];

        let header_class = "big-header";
        
        for (const location of small_header) {
            if (location === this.props.location.pathname) {
                header_class = 'header';
            }
        }

        if (this.props.isOpen) {
            header_class = "header sidebar"
        }

        return <div className={header_class}>
            {this.props.isOpen? null: <img alt="header background" src={cyberPng}/>}

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

export default withRouter(Header)