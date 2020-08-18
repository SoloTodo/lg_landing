import React from "react"
import { connect } from "react-redux";
import { Button } from "reactstrap";

import { toggleFilter } from "../../redux/actions";


class DesktopFilterAndOrderButtons extends React.Component {
    render() {
        const filterList = []
        for (const type in this.props.appliedFilters) {
            for (const appliedFilter of this.props.appliedFilters[type]){
                filterList.push({name: type, filter:appliedFilter})
            }
        }

        return <div className="d-flex">
            <Button className="desktop-filter-button" onClick={this.props.toggleFilterModalOpen}>
                FILTRAR POR
            </Button>
            <Button className="desktop-order-button" onClick={this.props.toggleOrderModalOpen}>
                ORDENAR POR
            </Button>
            <div>
                {filterList.map(appliedFilter => {
                    return <Button key={appliedFilter.filter.option} className="filter-remove-button" onClick={() => this.props.toggleFilter(appliedFilter.name, appliedFilter.filter)}>
                        {appliedFilter.filter.option}
                    </Button>
                })}
            </div>
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleFilter: (filterName, filter) => dispatch(toggleFilter(filterName, filter))
    }
};

function mapStateToProps(state) {
    return {
        appliedFilters: state.appliedFilters,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopFilterAndOrderButtons);