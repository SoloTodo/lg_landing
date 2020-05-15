import React from "react";

import ProductListCard from "./ProductListCard";


class ProductList extends React.Component {
    toggleWantModalOpen = (productId) => {
        this.props.toggleWantModalOpen();
        this.props.setModalProduct(productId)
    };

    toggleDetailModalOpen = (productId) => {
        this.props.toggleDetailModalOpen();
        this.props.setModalProduct(productId)
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
                    toggleProductWantModal={() => this.toggleWantModalOpen(productEntry.product.id)}
                    toggleProductDetailModal={() => this.toggleDetailModalOpen(productEntry.product.id)}
                />
            })}
        </React.Fragment>
    }
}

export default ProductList;