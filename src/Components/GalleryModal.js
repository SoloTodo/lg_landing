import React from 'react'
import {Modal, ModalBody, ModalHeader, Card, CardBody, Button } from "reactstrap";
import { fetchJson } from "../react-utils/utils";
import Slider from 'react-slick';

import { CloseModalSvg, ArrowLeftSvg } from "../Icons";


class GalleryModal extends React.Component {
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


    closeAll = () => {
        this.props.toggle();
        this.props.toggleParent();
    }

    render() {
        const productEntry = this.props.productEntry;
        const images = this.state.images;

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
                return <div className="custom-dot"/>
            }
        };

        return <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader className="d-flex align-items-center product-modal-header">
                <div className="d-flex align-items-center justify-content-between">
                    <span>Estás viendo</span>
                    <span onClick={this.closeAll}><CloseModalSvg/></span>
                </div>
            </ModalHeader>
            <ModalBody className="gallery-modal">
                <Card className="gallery-modal-card">
                    <CardBody>
                        <div className="gallery-modal-button"><Button><ArrowLeftSvg className/> <span className="pl-2">Volver atrás</span></Button></div>
                        <Slider {...sliderSettings} className="gallery-modal-slider">
                            {images.map(image => {
                                return <div className="d-flex justify-content-center align-items-center"><img className="gallery-modal-img" alt="" src={image.file}/></div>
                            })}
                        </Slider>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    }
}

export default GalleryModal;