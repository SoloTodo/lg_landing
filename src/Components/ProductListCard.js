import React from "react";
import { connect } from "react-redux";
import { Button, Card, CardBody } from "reactstrap";
import ReactMarkdown from "react-markdown";

import { lgStateToPropsUtils } from "../utils";
import {filterApiResourceObjectsByType} from "../react-utils/ApiResource";
import { isMobile } from "../utils";

import {settings} from "../settings";


class ProductListCard extends React.Component {
    render() {
        // const availableBadges = {
        //     includesInstallation: <img key="includes_installation" src={settings.path + '/badges/includes_installation.png'} alt="Incluye instalación" width="101" height="41" />
        // };

        const productEntry = this.props.productEntry;
        const product = productEntry.product;
        const metadata = productEntry.metadata;
        const referencePrice = metadata.reference_price;

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

        const category = this.props.categories.filter(category => category.url === product.category)[0]
        const showCategoryDict = {
            6:  'Celulares',
            19: 'Lavadoras',
            11: 'Televisores',
            15: 'Refrigeradores'
        }

        // TODO: Badges
        // const productBadges = [];
        // for (const badgeName of lgData.badges || []) {
        //     productBadges.push(availableBadges[badgeName])
        // }

        const store = this.props.stores.filter(store => store.url === entity.store)[0];
        const pictureSide = isMobile()? 600 : 300;

        return <Card className="product-card">
            <CardBody>
                <div className="d-flex justify-content-between">
                    <div className="d-flex product-card-category justify-content-center align-items-center">{showCategoryDict[category.id]}</div>
                    <div className="d-flex product-card-sku align-items-center"><span className="mr-1">SKU:</span>{metadata.sku}</div>
                </div>
                <div className="d-flex product-card-name justify-content-center align-items-center">
                    {metadata.subtitle?
                        <div className="d-flex flex-column align-items-center product-title">
                            <h2 className="d-flex align-items-start">{metadata.title}</h2>
                            <span><ReactMarkdown source={metadata.subtitle}/></span>
                        </div>:
                        <h2 className="d-flex align-items-center">{metadata.title}</h2>}
                </div>
                <div className="d-flex product-card-image justify-content-center align-items-center">
                    <img alt={product.name} src={`https://publicapi.solotodo.com/products/${product.id}/picture?width=${pictureSide}&height=${pictureSide}`}/>

                    {/*{productBadges.length > 0 && <div className="product-card__badges">*/}
                    {/*    {productBadges.map(badge => badge)}*/}
                    {/*</div> }*/}
                </div>
                <div className="product-card-price">
                    <div className="d-flex justify-content-center price-text">Precio desde:</div>
                    <div className="d-flex justify-content-center price">
                        <span>{this.props.formatCurrency(entity.active_registry.offer_price)}</span>
                        <img className="product-card-retailer" alt="retailer logo" src={`${settings.path}/logo-${store.name.toLowerCase()}.png`}/>
                    </div>
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
                    <Button className="card-button want" onClick={() => this.props.toggleProductDetailModal(productEntry)}>Lo quiero</Button>
                </div>
            </CardBody>
        </Card>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);
    return {
        formatCurrency,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories')
    }
}

export default connect(mapStateToProps)(ProductListCard);