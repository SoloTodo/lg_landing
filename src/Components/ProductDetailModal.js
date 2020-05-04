import React from 'react'
import {Modal, ModalBody, ModalHeader, Button} from "reactstrap";

import { CloseModalSvg, ArrowSvg } from "../Icons";
import GalleryModal from "./GalleryModal";
import {filterApiResourceObjectsByType} from "../react-utils/ApiResource";
import {connect} from "react-redux";
import {lgStateToPropsUtils} from "../utils";
import { settings } from "../settings";


class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            galleryOpen: false
        }
    }

    toggleGallery = () => {
        this.setState({
            galleryOpen: !this.state.galleryOpen
        })
    }

    render() {
        const productEntry = this.props.productEntry;
        if (!productEntry) {
            return null
        }

        const product = productEntry.product;
        const lgData = productEntry.customFields;
        const entities = productEntry.entities;

        return <React.Fragment>
            <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader className="d-flex align-items-center product-modal-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <span>Estás viendo</span>
                        <span onClick={this.props.toggle}><CloseModalSvg/></span>
                    </div>
                </ModalHeader>
                <ModalBody className="product-modal">
                    <div className="d-flex align-content-between">
                        <div className="d-flex align-items-center product-modal-image"><img alt={product.name} src={product.picture_url} onClick={this.toggleGallery}/></div>
                        <div className="d-flex flex-column product-modal-text">
                            <span className="product-modal-sku"><span>SKU</span>: {lgData.lgSku}</span>
                            <span className="product-modal-name">{lgData.customTitle}</span>
                            <span className="product-modal-description">{lgData.customDescription}.</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button className="product-modal-button">Ver detalles técnicos</Button>
                    </div>
                    <div className="product-modal-separator"/>
                    <div className="d-flex product-modal-subtitle justify-content-center">COMPRALO DESDE</div>
                    <div>
                        {entities.map(entity => {
                            const store = this.props.stores.filter(store => store.url === entity.store)[0];
                            const badges = settings.storeBadges[store.id];
                            return <div>
                                <a href={entity.external_url} className="d-flex align-items-center justify-content-between product-modal-retailer">
                                    <div className="d-flex align-items-center product-modal-retailer-text">
                                        <div className="product-modal-img"><img alt="retailer logo" src={`/logo-${store.name.toLowerCase()}.png`}/></div>
                                        <span>{this.props.formatCurrency(entity.active_registry.offer_price)}</span>
                                        {badges?
                                            badges.map(badge => {
                                                return <div className="d-flex flex-column product-modal-badge">
                                                    <img alt="" src={badge.icon}/>
                                                    <span className="product-modal-badge-text">{badge.text}</span>
                                                </div>
                                            })
                                            :null
                                        }
                                    </div>
                                    <span><ArrowSvg/></span>
                                </a>
                            </div>
                        })}
                    </div>

                </ModalBody>
            </Modal>
            <GalleryModal isOpen={this.state.galleryOpen} toggle={this.toggleGallery} productEntry={productEntry} toggleParent={this.props.toggle}/>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        formatCurrency,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
    }
}

export default connect(mapStateToProps)(ProductDetailModal);