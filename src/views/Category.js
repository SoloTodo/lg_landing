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
import {initializeFilters, setModalProduct} from "../redux/actions";
import ProductDetailModal from "../Components/ProductDetailModal";


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderModalOpen: false,
            appliedOrder: settings.orderOptions[0],
            filterModalOpen: false,
        }
    }

    componentDidMount() {
        const appliedFilters = this.props.appliedFilters;
        if (!appliedFilters) {
            this.props.initializeFilters(this.props.name)
        }
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

    changeOrder = newOrder => {
        this.setState({
            appliedOrder: newOrder
        })
    }

    render() {
        if (!this.props.productEntries) {
            return null
        }

        let modalProductEntry = null;
        if (this.props.modalProduct) {
            modalProductEntry = this.props.productEntries.filter(productEntry => {
                return productEntry.product.id === this.props.modalProduct
            })[0]
        }

        let filteredProducts = this.props.productEntries.filter(productEntry => {
            return productEntry.customFields.pageCategories.includes(this.props.name)
        });

        const filters = settings.categoryFilters[this.props.name];
        const orderOptions = settings.orderOptions;
        const appliedOrder = this.state.appliedOrder;
        const appliedFilters = this.props.appliedFilters;

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
            {filters && appliedFilters?
                <FiltersModal
                    isOpen={this.state.filterModalOpen}
                    toggle={this.toggleFilterModalOpen}
                    filters={filters}/>
                    : null }
            {this.props.modalProduct?
                <ProductDetailModal isOpen={true} toggle={this.props.deleteModalProduct} productEntry={modalProductEntry}/>: null
            }
        </React.Fragment>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteModalProduct: () => dispatch(setModalProduct(null)),
        initializeFilters: (category) => dispatch(initializeFilters(category))
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state)

    return {
        formatCurrency,
        appliedFilters: state.appliedFilters,
        productEntries: state.productEntries,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories'),
        modalProduct: state.modalProduct
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);