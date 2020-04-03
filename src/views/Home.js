import React from 'react';
import { connect } from 'react-redux';

import {
    filterApiResourceObjectsByType
} from '../react-utils/ApiResource';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return <div className="container">
            Home
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        productEntries: state.productEntries,
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories')
    }
}

export default connect(mapStateToProps)(Home);