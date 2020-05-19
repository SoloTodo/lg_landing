import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import scrollToComponent from "react-scroll-to-component";
import classNames from "classnames"

import LgCarousel from "../Components/LgCarousel";
import LgCategoryButtons from "../Components/LgCategoryButtons";
import FilterAndOrderButtons from "../Components/FilterAndOrderButtons";
import FiltersModal from "../Components/FiltersModal";
import OrderModal from "../Components/OrderModal";
import ProductList from "../Components/ProductList";
import ProductDetailModal from "../Components/Mobile/ProductDetailModal";

import { initializeFilters, setModalProduct, setScroll } from "../redux/actions";
import { filterApiResourceObjectsByType } from "../react-utils/ApiResource";
import { isMobile, lgStateToPropsUtils } from "../utils";
import { settings } from "../settings";
import ProductWantModal from "../Components/Mobile/ProductWantModal";
import ProductWantSidebar from "../Components/Desktop/ProductWantSidebar";
import ProductDetailSidebar from "../Components/Desktop/ProductDetailSidebar";



class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderModalOpen: false,
            filterModalOpen: false,
            detailModalOpen: false,
            wantModalOpen: false,
            appliedOrder: settings.orderOptions[0],
            modalProduct: null
        }
    }

    componentDidMount() {
        if (this.props.modalProduct) {
            this.setState({
                modalProduct: this.props.modalProduct,
                detailModalOpen: true
            })
            this.props.deleteModalProduct()
        }

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
        if (this.props.modalProduct) {
            this.setState({
                modalProduct: this.props.modalProduct,
                detailModalOpen: true
            })
            this.props.deleteModalProduct()
        }

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

    setModalProduct = (modalProduct) => {
        this.setState({
            modalProduct
        })
    }

    toggleDetailModalOpen = () => {
        this.setState({
            detailModalOpen: !this.state.detailModalOpen
        })
    }

    toggleWantModalOpen = () => {
        this.setState({
            wantModalOpen: !this.state.wantModalOpen
        })
    }

    changeOrder = newOrder => {
        this.setState({
            appliedOrder: newOrder
        })
    };

    render() {
        if (!this.props.productEntries) {
            return null
        }

        /* TODO: Make to modal filter the product entry */

        const ProductWant = isMobile()? ProductWantModal: ProductWantSidebar;
        const ProductDetail = isMobile()? ProductDetailModal: ProductDetailSidebar;

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

        return <React.Fragment>
            <LgCarousel/>
            <ProductDetail
                isOpen={this.state.detailModalOpen}
                toggle={this.toggleDetailModalOpen}
                productId={this.state.modalProduct}/>
             <ProductWant
                 isOpen={this.state.wantModalOpen}
                 toggle={this.toggleWantModalOpen}
                 productId={this.state.modalProduct}/>
            <div className="content-container">
                <Container>
                    <div className="d-flex justify-content-center content-title pt-3">PRODUCTOS</div>
                    <LgCategoryButtons/>
                    {filters &&
                        <FilterAndOrderButtons
                            toggleOrderModalOpen={this.toggleOrderModalOpen}
                            toggleFilterModalOpen={this.toggleFilterModalOpen}/>}
                    <div className={classNames("d-flex flex-wrap justify-content-between")} ref={(e) => { this.productList = e; }}>
                        <ProductList
                            productList={filteredProducts}
                            setModalProduct={this.setModalProduct}
                            toggleDetailModalOpen={this.toggleDetailModalOpen}
                            toggleWantModalOpen={this.toggleWantModalOpen}/>
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
                    : null
            }
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