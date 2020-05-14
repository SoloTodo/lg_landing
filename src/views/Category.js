import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import scrollToComponent from "react-scroll-to-component";
import classNames from "classnames"

import LgCarousel from "../Components/LgCarousel";
import LgCategoryButtons from "../Components/Mobile/LgCategoryButtons";
import FilterButtons from "../Components/FilterButtons";
import FiltersModal from "../Components/FiltersModal";
import OrderModal from "../Components/OrderModal";
import ProductList from "../Components/ProductList";
import ProductDetailModal from "../Components/Mobile/ProductDetailModal";

import { initializeFilters, setModalProduct, setScroll } from "../redux/actions";
import { filterApiResourceObjectsByType } from "../react-utils/ApiResource";
import { lgStateToPropsUtils } from "../utils";
import { settings } from "../settings";



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

        const scroll = this.props.scroll;

        if (scroll) {
            scrollToComponent(this.productList, {offset: 0, align: "top", duration: 500});
            this.props.deleteScroll();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const scroll = this.props.scroll;

        if (scroll) {
            scrollToComponent(this.productList, {offset: 0, align: "top", duration: 500});
            this.props.deleteScroll();
        }
    }

    toggleFilterModalOpen = () => {
        this.setState({
            filterModalOpen: !this.state.filterModalOpen
        })
    };

    toggleOrderModalOpen = () => {
        this.setState({
            orderModalOpen: !this.state.orderModalOpen
        })
    };

    changeOrder = newOrder => {
        this.setState({
            appliedOrder: newOrder
        })
    };

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
                        const filtersDict = Object.assign({}, productEntry.product.specs, productEntry.customFields["filters"])
                        const productValue = filtersDict[filterData.key]
                        const filterValue = Array.isArray(filterData.options) ? appliedFilter.option : filterData.options[appliedFilter.option];

                        if (filterData.type === "exact") {
                            result = productValue === filterValue;
                        } else if (filterData.type === "range") {
                            const range = filterData.range_data[filterValue];
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

        filteredProducts = filteredProducts.sort(appliedOrder.sortFunction);
        const justifyClass = window.innerWidth < 700? 'justify-content-center':'justify-content-between';

        return <React.Fragment>
            <LgCarousel/>
            <div className="content-container">
                <Container>
                    <div className="d-flex justify-content-center content-title pt-3">PRODUCTOS</div>
                    <LgCategoryButtons/>
                    {filters?
                        <FilterButtons
                            toggleOrderModalOpen={this.toggleOrderModalOpen}
                            toggleFilterModalOpen={this.toggleFilterModalOpen}/>:null
                    }
                    <div className={classNames("d-flex flex-wrap", justifyClass)} ref={(e) => { this.productList = e; }}>
                        <ProductList productList={filteredProducts}/>
                        <div className="dummy-product-card"/>
                    </div>
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
                    : null}
            {this.props.modalProduct?
                <ProductDetailModal isOpen={true} toggle={this.props.deleteModalProduct} productEntry={modalProductEntry}/>: null}
        </React.Fragment>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteModalProduct: () => dispatch(setModalProduct(null)),
        initializeFilters: (category) => dispatch(initializeFilters(category)),
        deleteScroll: () => dispatch(setScroll(false))
    }
};

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        formatCurrency,
        scroll: state.scroll,
        appliedFilters: state.appliedFilters,
        productEntries: state.productEntries,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories'),
        modalProduct: state.modalProduct
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);