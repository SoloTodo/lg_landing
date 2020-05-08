import React from 'react';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import classNames from "classnames"

import CategoryLink from "./CategoryLink";
import navigation from '../../Layout/_nav'


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
                    const isSelected = item.url === pathname;
                    if (!item.button) {
                        return null
                    }

                    return <CategoryLink to={item.url} key={item.url} className={classNames('slider-button d-flex justify-content-center align-items-center', {selected:isSelected})}>
                        {item.button_name}
                    </CategoryLink>
                })
            }
        </Slider>
    }
}


export default withRouter(LgCategoryButtons);