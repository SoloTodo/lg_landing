import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import Logo from '../logo.png'
import { SbSvg, CloseSvg, SearchSvg, SearchWhiteSvg } from '../Icons';
import SearchButton from "../Components/SearchButton";
import {emptyFilters} from "../redux/actions";


class Header extends React.Component{
    render() {
        const Icon = this.props.isOpen? CloseSvg : SbSvg;
        const SearchIcon = this.props.isOpen? SearchWhiteSvg: SearchSvg;
        const header_class = this.props.isOpen? "header sidebar" : "header";

        return <div className={header_class}>
                <div className="header-logo">
                    <Link to="/" onClick={this.props.emptyFilters}>
                        <img alt= "LG Logo" src={Logo}/>
                    </Link>
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

const mapDispatchToProps = dispatch => {
    return {
        emptyFilters: () => dispatch(emptyFilters()),
    }
}

export default connect(null, mapDispatchToProps)(Header)