import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import ProductList from "../Components/ProductList";


class Search extends React.Component {
    render() {
        if (!this.props.productEntries) {
            return null
        }
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

export default connect(mapStateToProps)(Search);