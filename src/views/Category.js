import React from 'react';
import { connect } from 'react-redux';
import { Container, ButtonGroup, Button } from 'reactstrap';

import {
    filterApiResourceObjectsByType
} from '../react-utils/ApiResource';
import { lgStateToPropsUtils } from "../utils";
import LgCarousel from "../Components/LgCarousel";
import LgCategoryButtons from "../Components/LgCategoryButtons";
import FiltersModal from "../Components/FiltersModal";
import { settings } from "../settings";
import ProductList from "../Components/ProductList";
import OrderModal from "../Components/OrderModal";


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderModalOpen: false,
            appliedOrder: settings.orderOptions[0],
            filterModalOpen: false,
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

    toggleOrderModalOpen = () => {
        this.setState({
            orderModalOpen: !this.state.orderModalOpen
        })
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

    changeOrder = newOrder => {
        this.setState({
            appliedOrder: newOrder
        })
    }

    render() {
        if (!this.props.productEntries) {
            return null
        }

        let filteredProducts = this.props.productEntries.filter(productEntry => {
            return productEntry.customFields.pageCategories.includes(this.props.name)
        });

        const filters = settings.categoryFilters[this.props.name];
        const orderOptions = settings.orderOptions;
        const appliedOrder = this.state.appliedOrder;
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

        console.log(appliedOrder)
        filteredProducts = filteredProducts.sort(appliedOrder.sortFunction)

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
                            <Button className="order-button"
                                    onClick={this.toggleOrderModalOpen}>ORDENAR
                                POR</Button>
                        </ButtonGroup> : null
                    }
                    <ProductList productList={filteredProducts}/>
                </Container>
            </div>
            <OrderModal
                isOpen={this.state.orderModalOpen}
                toggle={this.toggleOrderModalOpen}
                orderOptions={orderOptions}
                appliedOrder={this.state.appliedOrder}
                changeOrder={this.changeOrder}/>
            {filters?
                <FiltersModal
                    isOpen={this.state.filterModalOpen}
                    toggle={this.toggleFilterModalOpen}
                    filters={filters}
                    appliedFilters = {this.state.appliedFilters}
                    addFilter={this.addFilter}
                    removeFilter={this.removeFilter}/>
                    : null }
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