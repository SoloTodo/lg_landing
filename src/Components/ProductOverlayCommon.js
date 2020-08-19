import React from "react";
import { connect } from "react-redux";

import ProductSpecs from "./ProductSpecs";
import LgLeadLink from "./LgLeadLink";
import { ArrowSvg } from "../Icons";
import { filterApiResourceObjectsByType } from "../react-utils/ApiResource";
import { lgStateToPropsUtils } from "../utils";
import { settings } from "../settings";


class ProductOverlayCommon extends React.Component {
    render() {
        const productEntry = this.props.productEntry;
        const entities = productEntry.entities.reduce((newEntities, entity) => {
            const stores = newEntities.map(entity => entity.store);
            return stores.includes(entity.store)? newEntities:[...newEntities, entity]
        }, []);

        return <React.Fragment>
            <div className="d-flex justify-content-center">
                <ProductSpecs productEntry={productEntry}/>
            </div>
            <div className="product-modal-separator"/>
            <div className="d-flex product-modal-subtitle justify-content-center">COMPRALO DESDE</div>
            <div>
                {entities.map(entity => {
                    const store = this.props.stores.filter(store => store.url === entity.store)[0];
                    const badges = settings.storeBadges[store.id];
                    return <div key={entity.id}>
                        <LgLeadLink entity={entity} product={productEntry.product} productPosition={this.props.productPosition} className="d-flex align-items-center justify-content-between product-modal-retailer">
                            <div className="d-flex align-items-center product-modal-retailer-text">
                                <div className="product-modal-img"><img alt="retailer logo" src={`${settings.path}/logo-${store.name.toLowerCase().replace(' ','_')}.png`}/></div>
                                <span>{this.props.formatCurrency(entity.active_registry.offer_price)}</span>
                                {badges?
                                    badges.map(badge => {
                                        return <div className="d-flex flex-column product-modal-badge" key={badge.text}>
                                            <img alt="" src={settings.path + badge.icon}/>
                                            <span className="product-modal-badge-text">{badge.text}</span>
                                        </div>
                                    })
                                    :null
                                }
                            </div>
                            <span><ArrowSvg/></span>
                        </LgLeadLink>
                    </div>
                })}
            </div>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        formatCurrency,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
    }
}

export default connect(mapStateToProps)(ProductOverlayCommon);