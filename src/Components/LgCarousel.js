import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import {settings} from "../settings";

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
                        return <Link to={banner.url} className="d-flex justify-content-center align-items-center slider-card"><img alt="" src={banner.src}/></Link>
                    })}
                </Slider>
            </div>
        </div>
    }
}

export default LgCarousel;