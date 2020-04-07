import React from 'react';
import { Container } from 'reactstrap';
import {Route, Switch} from 'react-router-dom'

import Sidebar from "./Sidebar";
import Header from './Header'
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
            <Container fluid>
                <Switch>
                    {routes.map((route, idx) => {
                        return <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={route.render}/>})}
                </Switch>
            </Container>
        </React.Fragment>
    }
}

export default Layout