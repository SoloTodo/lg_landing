import React from "react";

import ProductDetailModal from "./Mobile/ProductDetailModal";
import ProductDetailSidebar from "./Desktop/ProductDetailSidebar";
import { isMobile } from "../utils";
import {filterApiResourceObjectsByType} from "../react-utils/ApiResource";
import {connect} from "react-redux";


class ProductOverlays extends React.Component {
    registerDisplay = (product) => {
        const category = this.props.categories.filter(category => category.url === product.category)[0];

        const params = {};
        params['dimension1'] = category.name;
        params['dimension2'] = product.name;
        params['dimension4'] = `${category.name}¬${product.name}`;

        window.gtag('event', 'ProductDisplay', params)
    }

    render() {
        const ProductDetail = isMobile()? ProductDetailModal: ProductDetailSidebar;

        return <React.Fragment>
            <ProductDetail
                isOpen={this.props.detailOverlayOpen}
                toggle={this.props.toggleDetailOverlayOpen}
                productId={this.props.productId}
                registerDisplay={this.registerDisplay}/>
        </React.Fragment>
    }
}

function mapStateToProps(state) {

    return {
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories'),
    }
}

export default connect(mapStateToProps)(ProductOverlays);