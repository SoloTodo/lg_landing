import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Slider from 'react-slick';

import navigation from '../Layout/_nav'

class LgCategoryButtons extends React.Component {
    render() {
        const sliderSettings = {
            dots: false,
            arrows: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
        };

        const pathname = this.props.location.pathname;
        let initialSlide = 0;

        for (const idx in navigation.items) {
            if (navigation.items[idx].url === pathname) {
                initialSlide = idx;
            }
        }

        sliderSettings['initialSlide'] = initialSlide;

        return <Slider {...sliderSettings} className="slider-buttons">
            {
                navigation.items.map(item => {
                    const selected_class = item.url === pathname?
                        "slider-button selected d-flex justify-content-center align-items-center":
                        "slider-button d-flex justify-content-center align-items-center";

                    if (!item.button) {
                        return null
                    }

                    return <Link to={item.url} key={item.url} className={selected_class}>
                        {item.button_name}
                    </Link>
                })
            }
        </Slider>
    }
}


export default withRouter(LgCategoryButtons);