import React from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ReactMarkdown from "react-markdown";

import ProductModalCommon from "./ProductModalCommon";
import ProductGallery from "../ProductGallery";
import { CloseModalSvg } from "../../Icons";
import { lgStateToPropsUtils } from "../../utils";


class ProductDetailModal extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isOpen && this.props.productId !== prevProps.productId){
            const productEntry = this.props.productEntries.filter(productEntry => {
                return productEntry.product.id === this.props.productId
            })[0]
            this.props.registerDisplay(productEntry.product);
        }
    }

    render() {
        let productEntry = this.props.productEntries[0];
        if (this.props.productId) {
            productEntry = this.props.productEntries.filter(productEntry => {
                return productEntry.product.id === this.props.productId
            })[0]
        }

        const metadata = productEntry.metadata;

        return <React.Fragment>
            <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader className="d-flex align-items-center product-modal-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <span>Estás viendo</span>
                        <span onClick={this.props.toggle} className="overlay-close"><CloseModalSvg/></span>
                    </div>
                </ModalHeader>
                <ModalBody className="product-modal">
                    <div className="d-flex flex-column">
                        <span className="product-modal-sku"><span>SKU</span>: {metadata.sku}</span>
                        {metadata.subtitle?
                            <div className="d-flex flex-column product-modal-name-container">
                                <span className="product-modal-name flex-fill">{metadata.title}</span>
                                <span className="product-modal-name-subtitle"><ReactMarkdown source={metadata.subtitle}/></span>
                            </div>:
                            <span className="product-modal-name flex-fill">{metadata.title}</span>}
                    </div>
                    <div>
                        <ProductGallery productEntry={productEntry}/>
                    </div>
                    <div className="d-flex justify-content-center pt-3 pb-2">
                        <span className="product-modal-description">{metadata.description}</span>
                    </div>
                    <ProductModalCommon productEntry={productEntry}/>
                </ModalBody>
            </Modal>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        formatCurrency,
        productEntries: state.productEntries,
    }
}

export default connect(mapStateToProps)(ProductDetailModal);