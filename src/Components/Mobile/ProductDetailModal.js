import React from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import ProductModalCommon from "./ProductModalCommon";
import ProductGallery from "./ProductGallery";
import { CloseModalSvg } from "../../Icons";
import { filterApiResourceObjectsByType } from "../../react-utils/ApiResource";
import { lgStateToPropsUtils } from "../../utils";


class ProductDetailModal extends React.Component {
    render() {
        const productEntry = this.props.productEntry;
        if (!productEntry) {
            return null
        }

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
                    <div className="d-flex align-content-between align-items-center">
                        <span className="product-modal-name flex-fill">{lgData.customTitle}</span>
                        <span className="product-modal-sku"><span>SKU</span>: {lgData.lgSku}</span>
                    </div>
                    <div>
                        <ProductGallery productEntry={productEntry}/>
                    </div>
                    <div className="d-flex justify-content-center pt-3 pb-2">
                        <span className="product-modal-description">{lgData.customDescription}.</span>
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
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
    }
}

export default connect(mapStateToProps)(ProductDetailModal);