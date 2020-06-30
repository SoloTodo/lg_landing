import React from 'react'
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import classNames from "classnames"

import { toggleFilter } from "../redux/actions";
import { CheckSvg } from "../Icons";


class FiltersModal extends React.Component {
    render() {
        const filters = this.props.filters;
        const entries = this.props.entries;
        const appliedFilters = this.props.appliedFilters;

        const filtersWithOptions = filters.map(filter => {
            const options = [...new Set(entries.map(entry => {
                const filtersDict = {...entry.product.specs, ...entry.metadata};
                return filtersDict[filter.key]
            }))]

            const weightsDict = {}
            for (const entry of entries) {
                const filtersDict = {...entry.product.specs, ...entry.metadata};
                weightsDict[filtersDict[filter.key]] = filtersDict[filter.order || filter.key]
            }

            options.sort((a,b) => {
                if(weightsDict[a] > weightsDict[b]) return 1;
                if(weightsDict[a] < weightsDict[b]) return -1;
                return 0
            })

            return {
                ...filter,
                options
            }
        })

        return <Modal className="filter-modal" centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader className="filter-modal-header">
                FILTRAR POR
            </ModalHeader>
            <ModalBody>
                {filtersWithOptions.map(filter => <div key={filter.name}>
                        <span className="filter-name">{filter.name.toUpperCase()}</span>
                        <div>
                            {
                                filter.options.map(option => {
                                    const isApplied = appliedFilters[filter.name].filter(appliedFilter => appliedFilter.option === option).length
                                    return <Button
                                        key={option}
                                        className={classNames('filter-modal-button', {selected:isApplied})}
                                        onClick={() => this.props.toggleFilter(filter.name, { option: option })}>
                                        {option}
                                    </Button>
                                })}
                        </div>
                    </div>
                )}
                <div className="product-modal-separator"/>
                <Button className="filter-modal-ready d-flex justify-content-center align-items-center" onClick={this.props.toggle}><span className="pr-1">LISTO</span><span><CheckSvg/></span></Button>
            </ModalBody>
        </Modal>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleFilter: (filterName, filter) => dispatch(toggleFilter(filterName, filter))
    }
};

function mapStateToProps(state) {
    return {
        appliedFilters: state.appliedFilters
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);