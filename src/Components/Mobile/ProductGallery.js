import React from "react";
import { fetchJson } from "../../react-utils/utils";
import Slider from "react-slick";


class ProductGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: null
        }
    }

    componentDidMount() {
        const product = this.props.productEntry.product;
        fetchJson(`product_pictures/?products=${product.id}`).then(images => {
            this.setState({
                images: images.results
            })
        })
    }

    render() {
        const productEntry = this.props.productEntry;

        if (!this.state.images) {
            return null
        }

        const images = [{file: productEntry.product.picture_url}, ...this.state.images];

        if (!productEntry || !images) {
            return null
        }

        const sliderSettings = {
            dots: true,
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            customPaging: i => {
                return <div className="custom-dot gallery"/>
            }
        };

        return <Slider {...sliderSettings} className="gallery-modal-slider">
            {images.map(image => {
                return <div className="d-flex justify-content-center align-items-center"><img className="gallery-modal-img" alt="" src={image.file}/></div>
            })}
        </Slider>
    }
}

export default ProductGallery;