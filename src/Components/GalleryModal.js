import React from 'react'
import {Modal, ModalBody, ModalHeader } from "reactstrap";

import { CloseModalSvg } from "../Icons";


class GalleryModal extends React.Component {
    render() {
        const productEntry = this.props.productEntry;
        if (!productEntry) {
            return null
        }

        return <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader className="d-flex align-items-center product-modal-header">
                <div className="d-flex align-items-center justify-content-between">
                    <span>Estás viendo</span>
                    <span onClick={this.props.toggle}><CloseModalSvg/></span>
                </div>
            </ModalHeader>
            <ModalBody className="product-modal">

            </ModalBody>
        </Modal>
    }
}

export default GalleryModal;