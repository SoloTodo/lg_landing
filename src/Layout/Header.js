import React from 'react';
import { Container, Button } from 'reactstrap'
import classNames from "classnames"
import scrollToComponent from 'react-scroll-to-component';

import CategoryLink from "../Components/Mobile/CategoryLink";
import SearchButton from "../Components/Mobile/SearchButton";
import { SbSvg, SearchSvg} from '../Icons';
import Logo from '../logo.png'


class Header extends React.Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isOpen !== prevProps.isOpen) {
            scrollToComponent(this.header, {offset: 0, align: "top", duration: 1});
        }
    }

    render() {
        return <Container>
            <div className={classNames("header d-flex justify-content-between", {sidebar:this.props.isOpen})} ref={(e) => { this.header = e; }}>
                <div className="header-logo">
                    <CategoryLink to="/">
                        <img alt= "LG Logo" src={Logo}/>
                    </CategoryLink>
                </div>
                <div className="d-flex align-items-center justify-content-end flex-fill">
                    <SearchButton icon={SearchSvg}/>
                    <div className="header-sidebar-button d-flex align-items-center">
                        <Button className="header-button" color="link" onClick={this.props.toggleSidebarOpen}>
                            <SbSvg/>
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    }
}

export default Header