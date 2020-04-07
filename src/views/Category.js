import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
    filterApiResourceObjectsByType
} from '../react-utils/ApiResource';
import LgSlider from "../Layout/LgSlider";


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <React.Fragment>
            <LgSlider/>
            <Container fluid>
                {this.props.name}
            </Container>
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