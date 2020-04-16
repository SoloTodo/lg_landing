import React from 'react'
import {Modal, ModalBody, ModalHeader, Button} from "reactstrap";

import { CloseModalSvg, ArrowSvg } from "../Icons";


class ProductDetailModal extends React.Component {
    render() {
        const productEntry = this.props.productEntry;
        if (!productEntry) {
            return null
        }

        const product = productEntry.product;
        const lgData = productEntry.customFields;
        const entities = productEntry.entities;

        return <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader className="d-flex align-items-center product-modal-header">
                <div className="d-flex align-items-center justify-content-between">
                    <span>Estás viendo</span>
                    <span onClick={this.props.toggle}><CloseModalSvg/></span>
                </div>
            </ModalHeader>
            <ModalBody className="product-modal">
                <div className="d-flex align-content-between">
                    <div className="d-flex align-items-center product-modal-image"><img alt={product.name} src={product.picture_url}/></div>
                    <div className="d-flex flex-column product-modal-text">
                        <span className="product-modal-sku"><span>SKU</span>: {lgData.lgSku}</span>
                        <span className="product-modal-name">{lgData.customTitle}</span>
                        <span className="product-modal-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Button className="product-modal-button">Ver detalles técnicos</Button>
                </div>
                <div className="product-modal-separator"/>
                <div className="d-flex product-modal-subtitle justify-content-center">COMPRALO DESDE</div>
                <div>
                    {entities.map(entity => {
                        console.log(entity)
                        return <div>
                            <a href={entity.external_url} className="d-flex align-items-center justify-content-between product-modal-retailer">
                                <div>
                                    <span>{entity.active_registry.offer_price}</span>
                                </div>
                                <span><ArrowSvg/></span>
                            </a>
                        </div>
                    })}
                </div>

            </ModalBody>
        </Modal>
    }
}

export default ProductDetailModal;