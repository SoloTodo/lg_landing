import React from "react";

import ProductListCard from "./ProductListCard";
import ProductWantModal from "./ProductWantModal";
import ProductDetailModal from "./ProductDetailModal";


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productWantModalOpen: false,
            productDetailModalOpen: false,
            modalProductEntry: null,
        }
    }

    toggleWantModalOpen = (productEntry) => {
        if (this.state.productWantModalOpen) {
            this.setState({
                productWantModalOpen: false,
                modalProductEntry: null
            })
        } else {
            this.setState({
                productWantModalOpen: true,
                modalProductEntry: productEntry
            })
        }
    };

    toggleDetailModalOpen = (productEntry) => {
        if (this.state.productDetailModalOpen) {
            this.setState({
                productDetailModalOpen: false,
                modalProductEntry: null
            })
        } else {
            this.setState({
                productDetailModalOpen: true,
                modalProductEntry: productEntry
            })
        }
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
                    toggleProductWantModal={this.toggleWantModalOpen}
                    toggleProductDetailModal={this.toggleDetailModalOpen}
                />
            })}
            <ProductWantModal isOpen={this.state.productWantModalOpen} toggle={() => this.toggleWantModalOpen(null)} productEntry={this.state.modalProductEntry}/>
            <ProductDetailModal isOpen={this.state.productDetailModalOpen} toggle={() => this.toggleDetailModalOpen(null)} productEntry={this.state.modalProductEntry}/>

        </React.Fragment>
    }
}

export default ProductList;