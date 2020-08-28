import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Container } from "reactstrap";
import Slider from "react-slick";

import CategoryLink from "./CategoryLink";
import { settings } from "../settings";
import { isMobile } from "../utils";

class LgCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dragging = false;
    }

    handleBeforeChange = () => {
        this.dragging = true;
    };

    handleAfterChange = () => {
        this.dragging = false;
    };

    handleOnItemClick = e => {
        if (this.dragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    registerBannerClick = (banner, position) => {
        const path = this.props.location.pathname;

        const pathToCategoryDict = {
            '/': 'Home',
            '/televisores': 'Televisores',
            '/lavadoras': 'Lavadoras y Secadoras',
            '/celulares': 'Celulares',
            '/audio': 'Audio',
            '/refrigeradores': 'Refrigeradores',
            '/monitores': 'Monitores',
            '/proyectores': 'Proyectores',
        }

        const pageCategory = path === '/'? 'Home':'PLP';
        const category = pathToCategoryDict[path]

        const params = {};
        params['event_category'] = "Banner";
        params['event_label'] = banner.id;

        params['dimension1'] = category;
        params['dimension8'] = pageCategory;

        const sendinblueParams = {
            category:params['dimension1'],
            position: position+1,
        }

        params['metric1'] = position+1;
        window.gtag('event', 'Click', params);
        window.sendinblue.track('Banner click', {}, {data: sendinblueParams});
    }

    render() {
        const sliderSettings = {
            dots: true,
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            touchThreshold: 20,
            customPaging: i => {
                return <div className="custom-dot"/>
            }
        };

        const banners = settings.banners;
        let bannersRoute = isMobile()? '/banners/mobile/' : '/banners/desktop/';
        bannersRoute = settings.path + bannersRoute;

        return <Container className="banners-container"><div className="slider-limits">
            <div className="slider-container">
                <Slider {...sliderSettings} beforeChange={this.handleBeforeChange} afterChange={this.handleAfterChange}>
                    {banners.map((banner, idx) => {
                        const className = "d-flex justify-content-center align-items-center slider-card"
                        const onClick = this.props[banner.actionName]?
                            () => {
                                this.props[banner.actionName]();
                                this.registerBannerClick(banner, idx)} :
                            () => {
                                this.registerBannerClick(banner, idx)}
                        if (banner.type === "div"){
                            return <div onClickCapture={this.handleOnItemClick} key={banner.src} className={className} onClick={onClick}><img alt="" src={bannersRoute + banner.src}/></div>
                        } else {
                            return <div key={banner.src} onClickCapture={this.handleOnItemClick}>
                                <CategoryLink to={banner.url} className={className} onClick={onClick}><img alt="" src={bannersRoute + banner.src}/></CategoryLink>
                            </div>
                        }
                    })}
                </Slider>
            </div>
        </div></Container>
    }
}

const mapDispatchToProps = dispatch => {
    const result = {}
    const banners = settings.banners;
    for (const banner of banners) {
        if (banner.actions) {
            result[banner.actionName] = () => {
                for (const action of banner.actions){
                    dispatch(action)
                }
            }
        }
    }
    return result
}

const mapStateToProps = state => {
    return {
        modalProduct: state.modalProduct
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LgCarousel));