import React from 'react';
import { withRouter } from "react-router-dom";

import ProductDetailModal from "../Components/ProductDetailModal";
import { parse } from "query-string";
import ProductListCard from "./ProductListCard";


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productModalOpen: false,
            modalProductEntry: null,
        }
    }

    componentDidMount() {
        const queryParams = this.props.location.search;
        const productId = parse(queryParams)['product'];

        if (productId) {
            const productEntry = this.props.productList.filter(entry => {return entry.product.id === parseInt(productId)})[0];
            this.setState({
                productModalOpen: true,
                modalProductEntry: productEntry
            })
        }
    }

    toggleProductModalOpen = (productEntry) => {
        if (this.state.productModalOpen) {
            this.setState({
                productModalOpen: false,
                modalProductEntry: null
            })
        } else {
            this.setState({
                productModalOpen: true,
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
                return <ProductListCard key={productEntry.product.id} productEntry={productEntry} toggleProductModalOpen={this.toggleProductModalOpen}/>
            })}
            <ProductDetailModal isOpen={this.state.productModalOpen} toggle={() => this.toggleProductModalOpen(null)} productEntry={this.state.modalProductEntry}/>
        </React.Fragment>
    }
}

export default withRouter(ProductList);