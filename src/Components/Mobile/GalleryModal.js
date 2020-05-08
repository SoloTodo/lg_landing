import React from "react";
import { Modal, ModalBody, ModalHeader, Card, CardBody, Button } from "reactstrap";

import { CloseModalSvg, ArrowLeftSvg } from "../../Icons";
import ProductGallery from "./ProductGallery";


class GalleryModal extends React.Component {
    closeAll = () => {
        this.props.toggle();
        this.props.toggleParent();
    }

    render() {
        const productEntry = this.props.productEntry;

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
                        <div className="gallery-modal-button"><Button onClick={this.props.toggle}><ArrowLeftSvg/> <span className="pl-2">Volver atrás</span></Button></div>
                        <ProductGallery productEntry={productEntry}/>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    }
}

export default GalleryModal;