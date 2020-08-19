import React from "react";
import {connect} from "react-redux";

import LeadLink from "../react-utils/components/LeadLink";
import {filterApiResourceObjectsByType} from "../react-utils/ApiResource";
import {settings} from "../settings";


class LgLeadLink extends React.Component {
    onClick = () => {
        const product = this.props.product;
        const category = this.props.categories.filter(category => category.url === product.category)[0];
        const entity = this.props.entity;
        const store = this.props.stores.filter(store => store.url === entity.store)[0];

        const params = {};
        params['dimension1'] = category.name;
        params['dimension2'] = product.name;
        params['dimension3'] = store.name;

        const sendinblueParams = {
            category: category.name,
            product: product.name,
            retailer: store.name
        }

        const analyticsSpecs = settings.categoryAnalyticsSpecs[category.id]
        const analyticsSpecsKeys = settings.categoryAnalyticsKeys;

        for (let idx=0; idx<analyticsSpecs.length; idx++) {
            const key = analyticsSpecsKeys[idx];
            const specName = analyticsSpecs[idx];
            params['dimension'+key] = product.specs[specName]
            sendinblueParams['spec' + (idx+1)] = product.specs[specName]
        }

        params['metric1'] = this.props.productPosition;
        sendinblueParams['position'] = this.props.productPosition;
        params['event_category'] = 'Lead';
        params['event_label'] = product.name;
        params['value'] = parseInt(entity.active_registry.offer_price);
        sendinblueParams['value'] = parseInt(entity.active_registry.offer_price);

        window.gtag('event', 'Follow', params);
        window.sendinblue.track('Lead', {}, {data: sendinblueParams});

        // LG Internal tracking
        const modelName = product.name.toLowerCase();
        const scBeacon = document.createElement('img');
        const locationHref = document.location.href;
        const scBeaconAddr = `https://tracking.lg.com/b/ss/${settings.lgTrackingName}/1/${Math.random()}?events=event6&v6=${encodeURIComponent(store.name)}&v10=${modelName}&products=;${modelName}&pe=lnk_o&pev2=online-partner&pev1=D=g&g=${encodeURIComponent(locationHref)}`;
        scBeacon.setAttribute('src', scBeaconAddr);
    }

    render() {
        const entity = this.props.entity;
        const store = this.props.stores.filter(store => store.url === entity.store)[0];
        return <LeadLink
            entity={entity}
            store={store}
            soicosPrefix="LP_"
            websiteId={settings.websiteId}
            callback={this.onClick}
            className={this.props.className}
            >
            {this.props.children}
        </LeadLink>
    }
}

function mapStateToProps(state) {

    return {
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories'),
    }
}

export default connect(mapStateToProps)(LgLeadLink);