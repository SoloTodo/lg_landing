import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Button, Card, CardBody } from "reactstrap";
import ReactMarkdown from "react-markdown";

import { lgStateToPropsUtils } from "../utils";
import {filterApiResourceObjectsByType} from "../react-utils/ApiResource";
import { isMobile } from "../utils";

import {settings} from "../settings";


class ProductListCard extends React.Component {
    onProductClick = evt => {
        evt.preventDefault()
        const productEntry = this.props.productEntry;
        const product = productEntry.product;
        const category = this.props.categories.filter(category => category.url === product.category)[0];
        const path = this.props.location.pathname;

        this.props.toggleProductDetailModal(productEntry);

        // Product Cell Click Event
        const pathToPageCategoryDict = {
            '/': 'Home',
            '/televisores': 'PLP',
            '/lavadoras': 'PLP',
            '/celulares': 'PLP',
            '/refrigeradores': 'PLP',
            '/monitores': 'PLP',
            '/proyectores': 'PLP',
            '/search': 'Keywords'
        }
        const pageCategory = pathToPageCategoryDict[path];

        const params = {}
        params['event_category'] = 'Product cell';
        params['event_label'] = product.name;

        params['dimension1'] = category.name;
        params['dimension2'] = product.name;

        const analyticsSpecs = settings.categoryAnalyticsSpecs[category.id]
        const analyticsSpecsKeys = settings.categoryAnalyticsKeys;

        const sendinblueParams = {
            category: params['dimension1'],
            product: params['dimension2'],
        }
        if (analyticsSpecs) {
            for (let idx = 0; idx < analyticsSpecs.length; idx++) {
                const key = analyticsSpecsKeys[idx];
                const specName = analyticsSpecs[idx];
                params['dimension' + key] = product.specs[specName]
                sendinblueParams['spec' + (idx + 1)] = product.specs[specName];
            }
        }

        if (pageCategory) {
            params['dimension8'] = pageCategory
            sendinblueParams['page_category'] = pageCategory
        }

        params['metric1'] = this.props.position+1;
        sendinblueParams['position'] = this.props.position+1;
        window.gtag('event', 'Click', params);
        window.sendinblue.track('Product cell click', {}, {data: sendinblueParams});

    }

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
            15: 'Refrigeradores',
            4: 'Monitores',
            31: 'Proyectores'
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
                <a href="#" className="product-card__link" onClick={this.onProductClick}>
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
                            <img className="product-card-retailer" alt="retailer logo" src={`${settings.path}/logo-${store.name.toLowerCase().replace(' ', '_')}.png`}/>
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
                        <Button className="card-button want">Lo quiero</Button>
                    </div>
                </a>
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

export default withRouter(connect(mapStateToProps)(ProductListCard));