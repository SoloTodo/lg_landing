import React from 'react';
import { connect } from 'react-redux';
import { Container, ButtonGroup, Button, Card, CardBody } from 'reactstrap';

import {
    filterApiResourceObjectsByType
} from '../react-utils/ApiResource';
import {lgStateToPropsUtils} from "../utils";
import LgCarousel from "../Components/LgCarousel";
import LgCategoryButtons from "../Components/LgCategoryButtons";
import FiltersModal from "../Components/FiltersModal";
import ProductDetailModal from "../Components/ProductDetailModal";


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterModalOpen: false,
            productModalOpen: false,
            modalProductEntry: null,
        }
    }

    toggleFilterModalOpen = () => {
        this.setState({
            filterModalOpen: !this.state.filterModalOpen
        })
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
        if (!this.props.productEntries) {
            return null
        }
        const productList = this.props.productEntries.filter(productEntry => {
            return productEntry.customFields.pageCategories.includes(this.props.name)
        })

        const showFilters = this.props.name !== "Home"

        return <React.Fragment>
            <LgCarousel/>
            <div className="content-container">
                <Container fluid>
                    <div className="d-flex justify-content-center content-title pt-3">PRODUCTOS</div>
                    <LgCategoryButtons/>
                    {showFilters ?
                        <ButtonGroup
                            className="d-flex justify-content-center">
                            <Button className="filter-button"
                                    onClick={this.toggleFilterModalOpen}>FILTRAR
                                POR</Button>
                            <Button className="order-button">ORDENAR
                                POR</Button>
                        </ButtonGroup> : null
                    }
                    {productList.map(productEntry => {
                        let entity = productEntry.entities[0]
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
                </Container>
            </div>
            <FiltersModal isOpen={this.state.filterModalOpen} toggle={this.toggleFilterModalOpen}/>
            <ProductDetailModal isOpen={this.state.productModalOpen} toggle={() => this.toggleProductModalOpen(null)} productEntry={this.state.modalProductEntry}/>
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