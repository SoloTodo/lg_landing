import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component';

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import routes from "./routes";


class Layout extends React.Component{
    componentDidMount() {
        this.registerPageView();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.registerPageView()
        }
    }

    registerPageView = () => {
        const path = this.props.location.pathname;
        const pathToCategoryDict = {
            '/': 'Home',
            '/televisores': 'Televisores',
            '/lavadoras': 'Lavadoras y Secadoras',
            '/celulares': 'Celulares',
            '/refrigeradores': 'Refrigeradores'
        }
        const category = pathToCategoryDict[path];
        const params = {}

        params['page_path'] = path
        if (category) {
            params['dimension1'] = category
        }

        window.gtag('config', 'UA-137962556-3', params)
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
        const isRegister = this.props.location.pathname === '/register';

        return <React.Fragment>
            {isRegister? null:
                <React.Fragment>
                <Sidebar isOpen={this.state.isOpen} toggleSidebarOpen={this.toggleSidebarOpen}/>
                <Header isOpen={this.state.isOpen} toggleSidebarOpen={this.toggleSidebarOpen} ref={(e) => { this.header = e; }}/>
                </React.Fragment>
            }

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