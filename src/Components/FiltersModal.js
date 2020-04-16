import React from 'react'
import {Modal, ModalHeader, ModalBody, Button} from "reactstrap";

import {settings} from "../settings";


class FiltersModal extends React.Component {
    render() {
        const filters = settings.categoryFilters[this.props.categoryName];
        console.log(filters);
        return <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader>
                FILTRAR POR
            </ModalHeader>
            <ModalBody>
                {filters.map(filter => {
                    return <div>
                        <span>{filter.name.toUpperCase()}</span>
                        <div>
                            {filter.options.map(option => {
                                return <Button>{option}</Button>
                            })}
                        </div>
                    </div>
                })}

            </ModalBody>
        </Modal>
    }
}

export default FiltersModal;