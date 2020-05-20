import React from "react";

import ProductListCard from "./ProductListCard";


class ProductList extends React.Component {
    toggleWantOverlayOpen = (productId) => {
        this.props.toggleWantOverlayOpen();
        this.props.setOverlayProduct(productId)
    };

    toggleDetailOverlayOpen = (productId) => {
        this.props.toggleDetailOverlayOpen();
        this.props.setOverlayProduct(productId)
    };

    render() {
        if (!this.props.productList) {
            return null
        }

        return <React.Fragment>
            {this.props.productList.map(productEntry => {
                return <ProductListCard
                    key={productEntry.product.id}
                    productEntry={productEntry}
                    toggleProductWantModal={() => this.toggleWantOverlayOpen(productEntry.product.id)}
                    toggleProductDetailModal={() => this.toggleDetailOverlayOpen(productEntry.product.id)}
                />
            })}
        </React.Fragment>
    }
}

export default ProductList;