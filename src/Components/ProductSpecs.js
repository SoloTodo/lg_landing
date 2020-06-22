import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody } from "reactstrap";

import { SpecsSvg } from "../Icons";
import { filterApiResourceObjectsByType } from "../react-utils/ApiResource";
import { settings } from "../settings";


class ProductSpecs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    render() {
        const category = this.props.categories.filter(category => category.url === this.props.productEntry.product.category)[0];

        const specsDict = {
            ...this.props.productEntry.product.specs,
            ...this.props.productEntry.metadata
        };
        const categorySpecs = settings.categorySpecs[category.name];

        if (!categorySpecs) {
            return null
        }

        return <div className="product-specs d-flex flex-column">
            <Card className="product-specs-card">
                <CardHeader className="d-flex align-items-center product-specs-title">
                    <SpecsSvg/><span className="pl-2">Basic Specs</span>
                </CardHeader>
                <CardBody className="product-specs-card-body">
                    <div className="d-flex flex-wrap">
                        {categorySpecs.map(spec => {
                            return <div className="d-flex flex-column product-specs-item" key={spec.name}>
                                <span className="product-specs-item-title">{spec.name}</span>
                                <span className="product-specs-item-content">{specsDict[spec.key]}</span>
                            </div>
                        })}
                    </div>
                </CardBody>
            </Card>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        categories: filterApiResourceObjectsByType(state.apiResourceObjects, 'categories'),
    }
}

export default connect(mapStateToProps)(ProductSpecs)