import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

import CategoryLink from "./CategoryLink";
import { settings } from "../../settings";


class LgCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const sliderSettings = {
            dots: true,
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            customPaging: i => {
                return <div className="custom-dot"/>
            }
        };

        const banners = settings.banners;
        const bannersRoute = window.innerWidth < 700? '/banners/mobile/' : '/banners/desktop/'

        return <div className="slider-limits">
            <div className="slider-container">
                <Slider {...sliderSettings}>
                    {banners.map(banner => {
                        const className = "d-flex justify-content-center align-items-center slider-card"
                        if (banner.type === "div"){
                            return <div key={banner.src} className={className} onClick={this.props[banner.actionName]}><img alt="" src={bannersRoute + banner.src}/></div>
                        } else if (banner.type === "actionLink") {
                            return <CategoryLink key={banner.src} to={banner.url} className={className} onClick={this.props[banner.actionName]}><img alt="" src={bannersRoute + banner.src}/></CategoryLink>
                        } else {
                            return <CategoryLink key={banner.src} to={banner.url} className={className}><img alt="" src={bannersRoute + banner.src}/></CategoryLink>
                        }
                    })}
                </Slider>
            </div>
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(LgCarousel);