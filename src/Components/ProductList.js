import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody } from 'reactstrap';
import { withRouter } from "react-router-dom";

import ProductDetailModal from "../Components/ProductDetailModal";
import { lgStateToPropsUtils } from "../utils";
import { parse } from "query-string";


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
            const productEntry = this.props.productList.filter(entry => {console.log(entry.product.id); return entry.product.id === parseInt(productId)})[0]
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

        const availableBadges = {
            includesInstallation: <img src="/badges/includes_installation.png" alt="Incluye instalación" width="101" height="41" />
        };

        return <React.Fragment>
            {this.props.productList.map(productEntry => {
                let entity = productEntry.entities[0];
                for (const e of productEntry.entities){
                    if (e.active_registry.offer_price < entity.active_registry.offer_price) {
                        entity = e
                    }
                }
                const activeRegistry = entity.active_registry;
                const product = productEntry.product;
                const lgData = productEntry.customFields;
                const referencePrice = lgData.referencePrice;

                let discountPercentage = null;

                if (referencePrice) {
                    const referencePriceValue = parseFloat(referencePrice);
                    const offerPriceValue = parseFloat(activeRegistry.offer_price);

                    discountPercentage = Math.round(100 * (referencePriceValue - offerPriceValue) / referencePriceValue);

                    if (discountPercentage <= 0) {
                        discountPercentage = null;
                    }
                }

                const productBadges = [];

                for (const badgeName of lgData.badges || []) {
                    productBadges.push(availableBadges[badgeName])
                }

                return <Card key={product.id} className="product-card">
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex product-card-category justify-content-center align-items-center">{lgData.showCategory}</div>
                            <div className="d-flex product-card-sku align-items-center"><span className="mr-1">SKU:</span>{lgData.lgSku}</div>
                        </div>
                        <div className="d-flex product-card-name justify-content-center align-items-center">
                            <h2>{lgData.customTitle}</h2>
                        </div>
                        <div className="d-flex product-card-image justify-content-center align-items-center">
                            <img alt={product.name} src={product.picture_url}/>

                            {productBadges.length > 0 && <div className="product-card__badges">
                                {productBadges.map(badge => badge)}
                            </div> }
                        </div>
                        <div className="product-card-price">
                            <div className="d-flex justify-content-center price-text">Precio desde:</div>
                            <div className="d-flex justify-content-center price">{this.props.formatCurrency(entity.active_registry.offer_price)}</div>
                            {referencePrice ?
                                <div className="d-flex justify-content-center old-price">
                                    Precio normal: <span className="ml-1">{this.props.formatCurrency(referencePrice)}</span>
                                </div>:
                                null
                            }

                            {discountPercentage && <div className="product-card__discount-badge d-flex flex-column justify-content-center align-items-center">
                                <span className="product-card__discount-badge__value">{discountPercentage}%</span>
                                <span>de desct.</span>
                            </div>}
                        </div>
                        <div className="d-flex flex-column pt-4">
                            <Button className="card-button product" onClick={() => this.toggleProductModalOpen(productEntry)}>Ver producto</Button>
                            <Button className="card-button want">Lo quiero</Button>
                        </div>
                    </CardBody>
                </Card>
            })}
            <ProductDetailModal isOpen={this.state.productModalOpen} toggle={() => this.toggleProductModalOpen(null)} productEntry={this.state.modalProductEntry}/>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        formatCurrency,
    }
}

export default withRouter(connect(mapStateToProps)(ProductList));