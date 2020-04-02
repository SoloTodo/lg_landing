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
        console.log(this.props.categories);
        return <div>Probando</div>;
    }
}

function mapStateToProps(state) {
    return {
        stores: filterApiResourceObjectsByType(state.apiResourceObjects, 'stores'),
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories')
    }
}

export default connect(mapStateToProps)(Home);