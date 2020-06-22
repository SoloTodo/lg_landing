import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import { parse } from "query-string";
import Fuse from "fuse.js";

import ProductList from "../Components/ProductList";
import ProductOverlays from "../Components/ProductOverlays";


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailOverlayOpen: false,
            overlayProduct: null
        }
    }

    toggleDetailOverlayOpen = () => {
        this.setState({
            detailOverlayOpen: !this.state.detailOverlayOpen
        })
    }

    setOverlayProduct = (overlayProduct) => {
        this.setState({
            overlayProduct
        })
    }

    render() {
        if (!this.props.productEntries) {
            return null
        }

        const queryParams = this.props.location.search;
        const keyword = parse(queryParams)['keyword'];
        const productList = this.props.productEntries;

        const options = {
            keys: [
                "product.name",
                "metadata.title",
            ],
            threshold: 0.3
        }

        const fuse = new Fuse(productList, options);
        const searchResult = fuse.search(keyword).map(result => {
            return result.item
        })

        if (!searchResult) {
            return null
        }

        return <React.Fragment>
            <ProductOverlays
                productId={this.state.overlayProduct}
                toggleDetailOverlayOpen={this.toggleDetailOverlayOpen}
                detailOverlayOpen={this.state.detailOverlayOpen}/>
            <div className="content-container search">
                <Container>
                    <div className="d-flex justify-content-center content-title search pb-4">{searchResult.length} PRODUCTOS ENCONTRADOS</div>
                    <div className="d-flex flex-wrap justify-content-between" ref={(e) => { this.productList = e; }}>
                        <ProductList
                            productList={searchResult}
                            setOverlayProduct={this.setOverlayProduct}
                            toggleDetailOverlayOpen={this.toggleDetailOverlayOpen}/>
                        <div className="dummy-product-card"/>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    return {
        productEntries: state.productEntries,
    }
}

export default withRouter(connect(mapStateToProps)(Search));