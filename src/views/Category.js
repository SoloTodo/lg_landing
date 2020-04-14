import React from 'react';
import { connect } from 'react-redux';
import { Container, ButtonGroup, Button, Card, CardBody} from 'reactstrap';

import {
    filterApiResourceObjectsByType
} from '../react-utils/ApiResource';
import {lgStateToPropsUtils} from "../utils";
import LgCarousel from "../Components/LgCarousel";
import LgCategoryButtons from "../Components/LgCategoryButtons";


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <React.Fragment>
            <LgCarousel/>
            <div className="content-container">
                <Container fluid>
                    <div className="d-flex justify-content-center content-title pt-3">PRODUCTOS</div>
                    <LgCategoryButtons/>
                    <ButtonGroup className="d-flex justify-content-center pt-4">
                        <Button className="filter-button">FILTRAR POR</Button>
                        <Button className="order-button">ORDENAR POR</Button>
                    </ButtonGroup>
                    {this.props.productEntries.map(productEntry => {
                        let entity = productEntry.entities[0]

                        for (const e of productEntry.entities){
                            if (e.active_registry.offer_price < entity.active_registry.offer_price) {
                                entity = e
                            }
                        }

                        return <Card key={productEntry.product.id} className="product-card">
                            <CardBody>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex product-card-category justify-content-center align-items-center">Celulares</div>
                                    <div className="d-flex product-card-sku align-items-center"><span>SKU:</span>LMG810EA</div>
                                </div>
                                <div className="d-flex product-card-name justify-content-center align-items-center">
                                    <h2>{productEntry.product.name}</h2>
                                </div>
                                <div className="d-flex product-card-image justify-content-center align-items-center">
                                    <img alt={productEntry.product.name} src={productEntry.product.picture_url}/>
                                </div>
                                <div className="product-card-price">
                                    <div className="d-flex justify-content-center price-text">Precio desde:</div>
                                    <div className="d-flex justify-content-center price">{this.props.formatCurrency(entity.active_registry.offer_price)}</div>
                                    <div className="d-flex justify-content-center old-price">Precio normal: <span>{this.props.formatCurrency(entity.active_registry.normal_price)}</span></div>
                                </div>
                                <div className="d-flex flex-column pt-4">
                                    <Button className="card-button product">Ver producto</Button>
                                    <Button className="card-button want">Lo quiero</Button>
                                </div>
                            </CardBody>
                        </Card>
                    })}
                </Container>
            </div>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state)

    return {
        formatCurrency,
        productEntries: state.productEntries,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories')
    }
}

export default connect(mapStateToProps)(Category);