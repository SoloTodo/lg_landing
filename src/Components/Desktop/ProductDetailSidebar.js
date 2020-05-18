import React from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";

import ProductModalCommon from "../Mobile/ProductModalCommon";
import ProductGallery from "../ProductGallery";
import { CloseModalSvg } from "../../Icons";
import { filterApiResourceObjectsByType } from "../../react-utils/ApiResource";
import { lgStateToPropsUtils } from "../../utils";


class ProductDetailSidebar extends React.Component {
    isMenuOpen = (state) => {
        if (this.props.isOpen !== state.isOpen){
            this.props.toggle();
        }
    };

    render() {
        const productEntry = this.props.productEntry;
        if (!productEntry) {
            return null
        }

        const lgData = productEntry.customFields;

        return <Menu isOpen={this.props.isOpen} right className="product-sidebar" onStateChange={this.isMenuOpen}>
            <div className="d-flex align-items-center product-sidebar-header">
                <div className="d-flex align-items-center flex-fill justify-content-between">
                    <span>Estás viendo</span>
                    <span onClick={this.props.toggle}><CloseModalSvg/></span>
                </div>
            </div>
            <div className="product-modal">
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
            </div>
        </Menu>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        formatCurrency,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
    }
}

export default connect(mapStateToProps)(ProductDetailSidebar);