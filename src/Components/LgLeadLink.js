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
        params['dimension5'] = `${category.name}¬${product.name}¬${store.name}`;

        window.gtag('event', 'Lead', params)
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