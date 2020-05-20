import React from "react";

import ProductWantModal from "./Mobile/ProductWantModal";
import ProductWantSidebar from "./Desktop/ProductWantSidebar";
import ProductDetailModal from "./Mobile/ProductDetailModal";
import ProductDetailSidebar from "./Desktop/ProductDetailSidebar";
import { isMobile } from "../utils";


class ProductOverlays extends React.Component {
    render() {
        const ProductWant = isMobile()? ProductWantModal: ProductWantSidebar;
        const ProductDetail = isMobile()? ProductDetailModal: ProductDetailSidebar;

        return <React.Fragment>
            <ProductDetail
                isOpen={this.props.detailOverlayOpen}
                toggle={this.props.toggleDetailOverlayOpen}
                productId={this.props.productId}/>
            <ProductWant
                isOpen={this.props.wantOverlayOpen}
                toggle={this.props.toggleWantOverlayOpen}
                productId={this.props.productId}/>
        </React.Fragment>
    }
}

export default ProductOverlays