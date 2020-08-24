import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component';

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import routes from "./routes";
import CookiesMessage from "../Components/CookiesMessage";
import {settings} from "../settings";


class Layout extends React.Component{
    componentDidMount() {
        window.LiveChatWidget.call('hide');
        this.registerPageView();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.registerPageView()
        }
    }

    registerPageView = () => {
        const path = this.props.location.pathname;
        const search = this.props.location.search;
        const pathToCategoryDict = {
            '/televisores': 'Televisores',
            '/lavadoras': 'Lavadoras y Secadoras',
            '/celulares': 'Celulares',
            '/refrigeradores': 'Refrigeradores',
            '/monitores': 'Monitores',
            '/proyectores': 'Proyectores',
        }
        const pathToPageCategoryDict = {
            '/': 'Home',
            '/televisores': 'PLP',
            '/lavadoras': 'PLP',
            '/celulares': 'PLP',
            '/refrigeradores': 'PLP',
            '/monitores': 'PLP',
            '/proyectores': 'PLP',
            '/register': 'Register',
            '/search': 'Keywords'
        }
        const category = pathToCategoryDict[path];
        const pageCategory = pathToPageCategoryDict[path];
        const params = {}

        params['page_path'] = `${path}${search}`
        const pageUrl = `https://www.lg.com/cyber${path}${search}`
        params['page_location'] = pageUrl

        let pageTitle = 'Promociones LG';

        if (pageCategory === 'Home') {
            pageTitle = 'Home'
        }

        if (pageCategory === 'Keywords') {
            pageTitle = 'Keywords'
        }

        if (pageCategory === 'Register') {
            pageTitle = 'Register'
        }

        if (category) {
            pageTitle = category
            params['dimension1'] = category
        }
        if (pageCategory) {
            params['dimension8'] = pageCategory
        }

        params['page_title'] = pageTitle
        window.gtag('config', settings.analyticsId, params)

        // Sendinblue tracking

        const sendinblueParams = {
            ma_title: pageTitle,
            ma_url: pageUrl
        }

        if (params['dimension1']) {
            sendinblueParams['category'] = params['dimension1']
        }

        if (params['dimension2']) {
            sendinblueParams['product'] = params['dimension2']
        }

        if (params['dimension6']) {
            sendinblueParams['spec1'] = params['dimension6']
        }

        if (params['dimension7']) {
            sendinblueParams['spec2'] = params['dimension7']
        }

        if (params['dimension8']) {
            sendinblueParams['page_category'] = params['dimension8']
        }

        window.sendinblue.page(pageTitle, sendinblueParams)
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
            <CookiesMessage/>
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