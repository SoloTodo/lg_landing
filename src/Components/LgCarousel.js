import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import { settings } from "../settings";

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

        return <div className="slider-limits">
            <div className="slider-container">
                <Slider {...sliderSettings}>
                    {banners.map(banner => {
                        if (banner.action){
                            return <div href="#" onClick={this.props[banner.actionName]} className="d-flex justify-content-center align-items-center slider-card"><img alt="" src={banner.src}/></div>
                        } else if (banner.actions) {
                            return <Link to={banner.url} className="d-flex justify-content-center align-items-center slider-card" onClick={this.props[banner.actionName]}><img alt="" src={banner.src}/></Link>
                        } else {
                            return <Link to={banner.url} className="d-flex justify-content-center align-items-center slider-card"><img alt="" src={banner.src}/></Link>
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
        if (banner.action) {
            result[banner.actionName] = () => dispatch(banner.action)
        }
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