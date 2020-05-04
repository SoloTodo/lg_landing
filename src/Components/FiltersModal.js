import React from 'react'
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody, Button} from "reactstrap";
import {toggleFilter} from "../redux/actions";


class FiltersModal extends React.Component {
    render() {
        const filters = this.props.filters;
        const appliedFilters = this.props.appliedFilters;

        const filterOptionsKeys = _filter => {
            return Array.isArray(_filter) ? _filter : Object.keys(_filter)
        }

        return <Modal className="filter-modal" centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader className="filter-modal-header">
                FILTRAR POR
            </ModalHeader>
            <ModalBody>
                {filters.map(filter => <div key={filter.name}>
                    <span className="filter-name">{filter.name.toUpperCase()}</span>
                    <div>
                        {
                            filterOptionsKeys(filter.options).map(option => {
                                let filterClass = "filter-modal-button";
                                let filterFunction = () => this.props.toggleFilter(filter.name, {
                                    option: option,
                                });

                                if (!appliedFilters[filter.name]) {
                                    return null;
                                }

                                for (const appliedFilter of appliedFilters[filter.name]) {
                                    if (appliedFilter.option === option) {
                                        filterClass = "filter-modal-button selected"
                                    }
                                }

                                return <Button key={option} className={filterClass} onClick={filterFunction}>{option}</Button>
                        })}
                    </div>
                </div>
            )}

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