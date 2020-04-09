import React from 'react';
import Slider from 'react-slick';

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

        return <div className="slider-limits">
            <div className="slider-container">
                <Slider {...sliderSettings}>
                    <div className="slider-card">
                    </div>
                    <div className="slider-card">
                    </div>
                    <div className="slider-card">
                    </div>
                </Slider>
            </div>
        </div>
    }
}

export default LgCarousel;