import React from "react";
import { connect } from "react-redux";

import ProductSpecs from "../ProductSpecs";
import { ArrowSvg } from "../../Icons";
import { filterApiResourceObjectsByType } from "../../react-utils/ApiResource";
import { lgStateToPropsUtils } from "../../utils";
import { settings } from "../../settings";



class ProductModalCommon extends React.Component {
    render() {
        const productEntry = this.props.productEntry;
        const entities = productEntry.entities;

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
                    return <div>
                        <a href={entity.external_url} className="d-flex align-items-center justify-content-between product-modal-retailer">
                            <div className="d-flex align-items-center product-modal-retailer-text">
                                <div className="product-modal-img"><img alt="retailer logo" src={`/logo-${store.name.toLowerCase()}.png`}/></div>
                                <span>{this.props.formatCurrency(entity.active_registry.offer_price)}</span>
                                {badges?
                                    badges.map(badge => {
                                        return <div className="d-flex flex-column product-modal-badge">
                                            <img alt="" src={badge.icon}/>
                                            <span className="product-modal-badge-text">{badge.text}</span>
                                        </div>
                                    })
                                    :null
                                }
                            </div>
                            <span><ArrowSvg/></span>
                        </a>
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

export default connect(mapStateToProps)(ProductModalCommon);