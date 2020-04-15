import React from 'react'
import {Modal, ModalBody} from "reactstrap";


class FiltersModal extends React.Component {
    render() {
        return <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalBody>
                Modal de Filtros
            </ModalBody>
        </Modal>
    }
}

export default FiltersModal;