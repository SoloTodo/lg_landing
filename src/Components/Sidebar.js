import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Container, Button } from 'reactstrap'

import { SbSvg, CloseSvg, ArrowSvg, SearchSvg, SearchWhiteSvg } from '../Icons';


class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggleSidebarOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    render() {
        const Icon = this.state.isOpen? CloseSvg : SbSvg;
        const SearchIcon = this.state.isOpen? SearchWhiteSvg: SearchSvg;
        const header_class = this.state.isOpen? "header sidebar" : "header";

        return <React.Fragment>
            <div className={header_class}>
                <div className="header-search-button">
                    <Button className="header-button" color="link">
                        <SearchIcon/>
                    </Button>
                </div>
                <div className="bm-burger-button visible">
                    <Button className="header-button" color="link" onClick={this.toggleSidebarOpen}>
                        <Icon/>
                    </Button>
                </div>
                <div className="header-separator"/>
            </div>
            <Menu right isOpen={this.state.isOpen}>
                <a href="/" className="menu-item d-flex justify-content-between">
                    <span>INICIO</span> <span><ArrowSvg/></span>
                </a>
                <a href="/" className="menu-item d-flex justify-content-between">
                    <span>CELULARES</span> <span><ArrowSvg/></span>
                </a>
                <a href="/" className="menu-item d-flex justify-content-between">
                    <span>LAVADORAS</span> <span><ArrowSvg/></span>
                </a>
            </Menu>
        </React.Fragment>
    }
}

export default Sidebar