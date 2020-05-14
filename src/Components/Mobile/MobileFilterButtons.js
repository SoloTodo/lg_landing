import React from "react"
import { Button, ButtonGroup } from "reactstrap";


class MobileFilterButtons extends React.Component {
    render() {
        return <ButtonGroup className="d-flex justify-content-center">
            <Button className="filter-button" onClick={this.props.toggleFilterModalOpen}>
                FILTRAR POR
            </Button>
            <Button className="order-button" onClick={this.props.toggleOrderModalOpen}>
                ORDENAR POR
            </Button>
        </ButtonGroup>
    }
}

export default MobileFilterButtons