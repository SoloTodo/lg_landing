import React from 'react'
import {Modal, ModalHeader, ModalBody, Button} from "reactstrap";


class FiltersModal extends React.Component {
    render() {
        const filters = this.props.filters;
        const appliedFilters = this.props.appliedFilters;
        return <Modal className="filter-modal" centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader className="filter-modal-header">
                FILTRAR POR
            </ModalHeader>
            <ModalBody>
                {filters.map(filter => {
                    return <div>
                        <span className="filter-name">{filter.name.toUpperCase()}</span>
                        <div>
                            {filter.options.map(option => {
                                let filterClass = "filter-modal-button"
                                let filterFunction = () => this.props.addFilter({
                                    type: filter.name,
                                    option: option,
                                })
                                for (const appliedFilter of appliedFilters) {
                                    if (appliedFilter.type === filter.name && appliedFilter.option === option) {
                                        filterClass = "filter-modal-button selected"
                                        filterFunction = () => this.props.removeFilter(appliedFilter)
                                    }
                                }
                                return <Button className={filterClass} onClick={filterFunction}>{option}</Button>
                            })}
                        </div>
                    </div>
                })}

            </ModalBody>
        </Modal>
    }
}

export default FiltersModal;