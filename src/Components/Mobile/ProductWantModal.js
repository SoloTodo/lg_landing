import React from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import ProductModalCommon from "./ProductModalCommon";
import GalleryModal from "./GalleryModal";
import { CloseModalSvg } from "../../Icons";
import { filterApiResourceObjectsByType } from "../../react-utils/ApiResource";
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
        const productEntry = this.props.productEntry;
        if (!productEntry) {
            return null
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
                    <div className="d-flex align-content-between">
                        <div className="d-flex align-items-center product-modal-image"><img alt={product.name} src={product.picture_url} onClick={this.toggleGallery}/></div>
                        <div className="d-flex flex-column product-modal-text">
                            <span className="product-modal-sku"><span>SKU</span>: {lgData.lgSku}</span>
                            <span className="product-modal-name">{lgData.customTitle}</span>
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
        formatCurrency,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
    }
}

export default connect(mapStateToProps)(ProductWantModal);