import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody } from 'reactstrap';

import ProductDetailModal from "../Components/ProductDetailModal";
import {lgStateToPropsUtils} from "../utils";


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productModalOpen: false,
            modalProductEntry: null,
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
    }

    render() {
        if (!this.props.productList) {
            return null
        }

        return <React.Fragment>
            {this.props.productList.map(productEntry => {
                let entity = productEntry.entities[0];
                for (const e of productEntry.entities){
                    if (e.active_registry.offer_price < entity.active_registry.offer_price) {
                        entity = e
                    }
                }
                const activeRegistry = entity.active_registry;
                const showOldPrice = activeRegistry.offer_price !== activeRegistry.normal_price
                const product = productEntry.product;
                const lgData = productEntry.customFields;

                return <Card key={product.id} className="product-card">
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex product-card-category justify-content-center align-items-center">{lgData.showCategory}</div>
                            <div className="d-flex product-card-sku align-items-center"><span>SKU:</span>{lgData.lgSku}</div>
                        </div>
                        <div className="d-flex product-card-name justify-content-center align-items-center">
                            <h2>{lgData.customTitle}</h2>
                        </div>
                        <div className="d-flex product-card-image justify-content-center align-items-center">
                            <img alt={product.name} src={product.picture_url}/>
                        </div>
                        <div className="product-card-price">
                            <div className="d-flex justify-content-center price-text">Precio desde:</div>
                            <div className="d-flex justify-content-center price">{this.props.formatCurrency(entity.active_registry.offer_price)}</div>
                            {showOldPrice?
                                <div className="d-flex justify-content-center old-price">
                                    Precio normal: <span>{this.props.formatCurrency(entity.active_registry.normal_price)}</span>
                                </div>:
                                null
                            }
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
    const {formatCurrency} = lgStateToPropsUtils(state)

    return {
        formatCurrency,
    }
}

export default connect(mapStateToProps)(ProductList);