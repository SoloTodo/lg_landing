import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component';

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import routes from "./routes";


class Layout extends React.Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location !== prevProps.location){
            window.gtag('config', 'UA-137962556-3', {'page_path': this.props.location.pathname})
        }
    }

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
    };

    render() {
        return <React.Fragment>
            <Sidebar isOpen={this.state.isOpen} toggleSidebarOpen={this.toggleSidebarOpen}/>
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
            <Footer footerButtonClick={this.footerButtonClick}/>
        </React.Fragment>
    }
}

export default withRouter(Layout)