import React from "react";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import classNames from "classnames"

import CategoryLink from "../CategoryLink";
import navigation from "../../Layout/_nav";


class CategoryButtonsMobile extends React.Component {
    render() {
        const sliderSettings = {
            dots: false,
            arrows: false,
            infinite: false,
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
        const items = navigation.items.filter(item => {
            return item.button
        })

        return <Slider {...sliderSettings} className="slider-buttons">
            {
                items.map(item => {
                    const isSelected = item.url === pathname;
                    return <CategoryLink to={item.url} key={item.url} className={classNames('slider-button d-flex justify-content-center align-items-center', {selected:isSelected})}>
                        {item.button_name}
                    </CategoryLink>
                })
            }
        </Slider>
    }
}


export default withRouter(CategoryButtonsMobile);