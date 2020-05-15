import React from "react";
import { connect } from "react-redux";
import { slide as Menu} from "react-burger-menu";

import ProductModalCommon from "../Mobile/ProductModalCommon";
import GalleryModal from "../Mobile/GalleryModal";
import { CloseModalSvg } from "../../Icons";
import { lgStateToPropsUtils } from "../../utils";


class ProductWantSidebar extends React.Component {
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
        
        return <Menu isOpen={ this.props.isOpen } right className="product-sidebar">
            <div className="d-flex align-items-center product-modal-header">
                <div className="d-flex align-items-center justify-content-between">
                    <span>Estás viendo</span>
                    <span onClick={this.props.toggle}><CloseModalSvg/></span>
                </div>
            </div>
            <div className="product-modal">
                <div className="d-flex align-content-between">
                    <div className="d-flex align-items-center product-modal-image"><img alt={product.name} src={product.picture_url} onClick={this.toggleGallery}/></div>
                    <div className="d-flex flex-column product-modal-text">
                        <span className="product-modal-sku"><span>SKU</span>: {lgData.lgSku}</span>
                        <span className="product-modal-name">{lgData.customTitle}</span>
                        <span className="product-modal-description">{lgData.customDescription}.</span>
                    </div>
                </div>
                <ProductModalCommon productEntry={productEntry}/>
            </div>
            <GalleryModal isOpen={this.state.galleryOpen} toggle={this.toggleGallery} productEntry={productEntry} toggleParent={this.props.toggle}/>
        </Menu>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        formatCurrency,
    }
}

export default connect(mapStateToProps)(ProductWantSidebar);