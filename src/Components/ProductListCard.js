import React from "react";
import { connect } from "react-redux";
import { Button, Card, CardBody } from "reactstrap";

import { lgStateToPropsUtils } from "../utils";


class ProductListCard extends React.Component {
    render() {
        const availableBadges = {
            includesInstallation: <img key="includes_installation" src="/badges/includes_installation.png" alt="Incluye instalación" width="101" height="41" />
        };

        const productEntry = this.props.productEntry;
        const product = productEntry.product;
        const lgData = productEntry.customFields;
        const referencePrice = lgData.referencePrice;

        let entity = productEntry.entities[0];
        for (const e of productEntry.entities){
            if (parseFloat(e.active_registry.offer_price) < parseFloat(entity.active_registry.offer_price)) {
                entity = e
            }
        }

        const activeRegistry = entity.active_registry;

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

        return <Card className="product-card">
            <CardBody>
                <div className="d-flex justify-content-between">
                    <div className="d-flex product-card-category justify-content-center align-items-center">{lgData.showCategory}</div>
                    <div className="d-flex product-card-sku align-items-center"><span className="mr-1">SKU:</span>{lgData.lgSku}</div>
                </div>
                <div className="d-flex product-card-name justify-content-center align-items-center">
                    <h2 className="d-flex align-items-center">{lgData.customTitle}</h2>
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
                    <Button className="card-button product" onClick={() => this.props.toggleProductDetailModal(productEntry)}>Ver producto</Button>
                    <Button className="card-button want" onClick={() => this.props.toggleProductWantModal(productEntry)}>Lo quiero</Button>
                </div>
            </CardBody>
        </Card>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);
    return {
        formatCurrency,
    }
}

export default connect(mapStateToProps)(ProductListCard);