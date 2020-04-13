import React from 'react';
import { connect } from 'react-redux';
import { Container, ButtonGroup, Button, Card, CardBody} from 'reactstrap';

import {
    filterApiResourceObjectsByType
} from '../react-utils/ApiResource';
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
                    <Card className="product-card">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex product-card-category justify-content-center align-items-center">Celulares</div>
                                <div className="d-flex product-card-sku align-items-center"><span>SKU:</span>LMG810EA</div>
                            </div>
                            <div className="d-flex product-card-name justify-content-center align-items-center">
                                <h2>G8s ThinQ</h2>
                            </div>
                            <div className="d-flex product-card-image justify-content-center align-items-center">
                                Image Here
                            </div>
                            <div className="product-card-price">
                                <div className="d-flex justify-content-center price-text">Precio desde:</div>
                                <div className="d-flex justify-content-center price">$309.000</div>
                                <div className="d-flex justify-content-center old-price">Precio normal: <span>$371.990</span></div>
                            </div>
                            <div className="d-flex flex-column pt-4">
                                <Button className="card-button product">Ver producto</Button>
                                <Button className="card-button want">Lo quiero</Button>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="product-card">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex product-card-category justify-content-center align-items-center">Celulares</div>
                                <div className="d-flex product-card-sku align-items-center"><span>SKU:</span>LMG810EA</div>
                            </div>
                            <div className="d-flex product-card-name justify-content-center align-items-center">
                                <h2>G8s ThinQ</h2>
                            </div>
                            <div className="d-flex product-card-image justify-content-center align-items-center">
                                Image Here
                            </div>
                            <div className="product-card-price">
                                <div className="d-flex justify-content-center price-text">Precio desde:</div>
                                <div className="d-flex justify-content-center price">$309.000</div>
                                <div className="d-flex justify-content-center old-price">Precio normal: <span>$371.990</span></div>
                            </div>
                            <div className="d-flex flex-column pt-4">
                                <Button className="card-button product">Ver producto</Button>
                                <Button className="card-button want">Lo quiero</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    return {
        productEntries: state.productEntries,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories')
    }
}

export default connect(mapStateToProps)(Category);