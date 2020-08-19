import React from "react";
import { withRouter } from 'react-router-dom'

import ProductDetailModal from "./Mobile/ProductDetailModal";
import ProductDetailSidebar from "./Desktop/ProductDetailSidebar";
import { isMobile } from "../utils";
import {filterApiResourceObjectsByType} from "../react-utils/ApiResource";
import {connect} from "react-redux";
import {settings} from "../settings";


class ProductOverlays extends React.Component {
    registerDisplay = (product) => {
        const category = this.props.categories.filter(category => category.url === product.category)[0];
        const path = this.props.location.pathname;
        const productPath = `${path}?product=${product.id}`;

        const params = {};
        params['page_title'] = product.name
        params['page_path'] = productPath
        params['page_location'] = `https://www.lg.com/cyber${productPath}`

        params['dimension1'] = category.name;
        params['dimension2'] = product.name;
        params['dimension8'] = "PDP";

        const analyticsSpecs = settings.categoryAnalyticsSpecs[category.id]
        const analyticsSpecsKeys = settings.categoryAnalyticsKeys;

        const sendinblueParams = {
            ma_title: params['page_title'],
            ma_url: params['page_location'],
            category: params['dimension1'],
            product: params['dimension2'],
            page_category: params['dimension8'],
        }

        for (let idx=0; idx<analyticsSpecs.length; idx++) {
            const key = analyticsSpecsKeys[idx];
            const specName = analyticsSpecs[idx];
            params['dimension'+key] = product.specs[specName];
            sendinblueParams['spec'+(idx+1)] = product.specs[specName];
        }

        window.gtag('config', settings.analyticsId, params);
        window.sendinblue.page(params['page_title'], sendinblueParams)
    }

    render() {
        const ProductDetail = isMobile()? ProductDetailModal: ProductDetailSidebar;

        return <React.Fragment>
            <ProductDetail
                isOpen={this.props.detailOverlayOpen}
                toggle={this.props.toggleDetailOverlayOpen}
                productId={this.props.productId}
                productPosition={this.props.productPosition}
                registerDisplay={this.registerDisplay}/>
        </React.Fragment>
    }
}

function mapStateToProps(state) {

    return {
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories'),
    }
}

export default withRouter(connect(mapStateToProps)(ProductOverlays));