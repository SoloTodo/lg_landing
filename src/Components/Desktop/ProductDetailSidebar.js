import React from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import ReactMarkdown from "react-markdown";

import ProductModalCommon from "../Mobile/ProductModalCommon";
import ProductGallery from "../ProductGallery";
import { CloseModalSvg } from "../../Icons";
import { lgStateToPropsUtils } from "../../utils";


class ProductDetailSidebar extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isOpen && this.props.productId !== prevProps.productId){
            const productEntry = this.props.productEntries.filter(productEntry => {
                return productEntry.product.id === this.props.productId
            })[0]
            this.props.registerDisplay(productEntry.product);
        }
    }

    isMenuOpen = (state) => {
        if (this.props.isOpen !== state.isOpen){
            this.props.toggle();
        }
    };

    render() {
        let productEntry = this.props.productEntries[0];
        if (this.props.productId) {
            productEntry = this.props.productEntries.filter(productEntry => {
                return productEntry.product.id === this.props.productId
            })[0]
        }

        const metadata = productEntry.metadata;

        return <Menu isOpen={this.props.isOpen} right className="product-sidebar" onStateChange={this.isMenuOpen}>
            <div className="d-flex align-items-center product-sidebar-header">
                <div className="d-flex align-items-center flex-fill justify-content-between">
                    <span>Estás viendo</span>
                    <span onClick={this.props.toggle} className="overlay-close"><CloseModalSvg/></span>
                </div>
            </div>
            <div className="product-modal">
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
            </div>
        </Menu>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        formatCurrency,
        productEntries: state.productEntries,
    }
}

export default connect(mapStateToProps)(ProductDetailSidebar);