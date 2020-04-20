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
import {settings} from "../settings";


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterModalOpen: false,
            productModalOpen: false,
            modalProductEntry: null,
            appliedFilters: {}
        }
    }

    componentDidMount() {
        const filters = settings.categoryFilters[this.props.name];
        const appliedFilters = {}

        if (filters) {
            for (const filter of filters) {
                appliedFilters[filter.name] = []
            }
        }

        this.setState({appliedFilters})
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

    addFilter = (filter_name, filter_add) => {
        const new_filters = this.state.appliedFilters;
        new_filters[filter_name] = [...new_filters[filter_name], filter_add];

        this.setState({
            appliedFilters: new_filters
        })
    }

    removeFilter = (filter_name, filter_remove) => {
        const new_filters = this.state.appliedFilters;

        new_filters[filter_name] = new_filters[filter_name].filter(filter_compare => {
            return filter_remove.option !== filter_compare.option;
        })

        this.setState({
            appliedFilters: new_filters
        })
    }

    render() {
        if (!this.props.productEntries) {
            return null
        }
        const productList = this.props.productEntries.filter(productEntry => {
            return productEntry.customFields.pageCategories.includes(this.props.name)
        })

        let filteredProducts = productList;
        const filters = settings.categoryFilters[this.props.name];
        const appliedFilters = this.state.appliedFilters;

        for (const filterKey in appliedFilters) {
            const filterData = filters.filter(filterData => filterData.name === filterKey)[0];
            const filterList = appliedFilters[filterKey];
            if (filterList.length) {
                filteredProducts = filteredProducts.filter(productEntry => {
                    let result = false;
                    for (const appliedFilter of filterList){
                        let productValue = null;
                        if (filterData.source === "specs") {
                             productValue = productEntry.product.specs[filterData.source_key];
                        } else {
                            productValue = productEntry.customFields["filters"][filterData.source_key];
                        }

                        if (filterData.type === "exact") {
                            result = productValue === appliedFilter.option;
                        } else if (filterData.type === "range") {
                            const range = filterData.range_data[appliedFilter.option];
                            result = productValue >= range[0] && productValue <= range[1];
                        }
                        if (result) {
                            return true;
                        }
                    }
                    return false;
                })
            }
        }

        return <React.Fragment>
            <LgCarousel/>
            <div className="content-container">
                <Container fluid>
                    <div className="d-flex justify-content-center content-title pt-3">PRODUCTOS</div>
                    <LgCategoryButtons/>
                    {filters?
                        <ButtonGroup
                            className="d-flex justify-content-center">
                            <Button className="filter-button"
                                    onClick={this.toggleFilterModalOpen}>FILTRAR
                                POR</Button>
                            <Button className="order-button">ORDENAR
                                POR</Button>
                        </ButtonGroup> : null
                    }
                    {filteredProducts.map(productEntry => {
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
                </Container>
            </div>
            {filters?
                <FiltersModal
                    isOpen={this.state.filterModalOpen}
                    toggle={this.toggleFilterModalOpen}
                    filters={filters}
                    appliedFilters = {this.state.appliedFilters}
                    addFilter={this.addFilter}
                    removeFilter={this.removeFilter}/>
                    : null }
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