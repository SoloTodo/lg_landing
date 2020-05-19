import React from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import ProductModalCommon from "./ProductModalCommon";
import GalleryModal from "./GalleryModal";
import { CloseModalSvg } from "../../Icons";
import { lgStateToPropsUtils } from "../../utils";


class ProductWantModal extends React.Component {
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
        let productEntry = this.props.productEntries[0];
        if (this.props.productId) {
            productEntry = this.props.productEntries.filter(productEntry => {
                return productEntry.product.id === this.props.productId
            })[0]
        }

        const product = productEntry.product;
        const lgData = productEntry.customFields;

        return <React.Fragment>
            <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader className="d-flex align-items-center product-modal-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <span>Estás viendo</span>
                        <span onClick={this.props.toggle}><CloseModalSvg/></span>
                    </div>
                </ModalHeader>
                <ModalBody className="product-modal">
                    <div className="d-flex flex-column">
                        <span className="product-modal-sku"><span>SKU</span>: {lgData.lgSku}</span>
                        <span className="product-modal-name flex-fill">{lgData.customTitle}</span>
                    </div>
                    <div className="d-flex align-content-between pt-4">
                        <div className="d-flex align-items-center product-modal-image"><img alt={product.name} src={product.picture_url} onClick={this.toggleGallery}/></div>
                        <div className="d-flex flex-column product-modal-text">
                            <span className="product-modal-description">{lgData.customDescription}.</span>
                        </div>
                    </div>
                    <ProductModalCommon productEntry={productEntry}/>
                </ModalBody>
            </Modal>
            <GalleryModal isOpen={this.state.galleryOpen} toggle={this.toggleGallery} productEntry={productEntry} toggleParent={this.props.toggle}/>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        productEntries: state.productEntries,
        formatCurrency,
    }
}

export default connect(mapStateToProps)(ProductWantModal);