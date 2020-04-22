import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {parse} from 'query-string';

import ProductList from "../Components/ProductList";


class Search extends React.Component {
    render() {
        if (!this.props.productEntries) {
            return null
        }
        const queryParams = this.props.location.search;
        const keyword = parse(queryParams)['keyword'];
        console.log(keyword);

        const productList = this.props.productEntries;

        return <React.Fragment>
            <div className="content-container search">
                <Container fluid>
                    <div className="d-flex justify-content-center content-title search pb-4">{productList.length} PRODUCTOS ENCONTRADOS</div>
                    <ProductList productList={productList}/>
                </Container>
            </div>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    return {
        productEntries: state.productEntries,
    }
}

export default withRouter(connect(mapStateToProps)(Search));