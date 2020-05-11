import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {Button} from "reactstrap";
import scrollToComponent from 'react-scroll-to-component';

import Sidebar from "../Sidebar";
import Header from '../Header'
import Footer from "./Footer";
import {ArrowUpSvg} from "../../Icons";
import routes from "../routes";


class MobileLayout extends React.Component{
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

    footerButtonClick = () => {
        scrollToComponent(this.header)
    }

    render() {
        return <React.Fragment>
            <Sidebar isMobile={true} isOpen={this.state.isOpen} toggleSidebarOpen={this.toggleSidebarOpen}/>
            <Header isOpen={this.state.isOpen} toggleSidebarOpen={this.toggleSidebarOpen} ref={(e) => { this.header = e; }}/>
            <Switch>
                {routes.map((route, idx) => {
                    return <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={route.render}/>})}
            </Switch>
            <Button className="footer-button" onClick={this.footerButtonClick}><ArrowUpSvg/></Button>
            <Footer/>
        </React.Fragment>
    }
}

export default MobileLayout