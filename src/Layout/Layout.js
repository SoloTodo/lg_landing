import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Sidebar from "./Sidebar";
import Header from './Header'
import Footer from "./Footer";
import routes from "./routes";


class Layout extends React.Component{
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
        return <React.Fragment>
            <Header isOpen={this.state.isOpen} toggleSidebarOpen={this.toggleSidebarOpen}/>
            <Sidebar isOpen={this.state.isOpen} toggleSidebarOpen={this.toggleSidebarOpen}/>
            <Switch>
                {routes.map((route, idx) => {
                    return <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={route.render}/>})}
            </Switch>
            <Footer/>
        </React.Fragment>
    }
}

export default Layout