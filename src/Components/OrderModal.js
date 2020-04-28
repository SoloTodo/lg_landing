import React from 'react'
import {Modal, ModalHeader, ModalBody, Button} from "reactstrap";


class OrderModal extends React.Component {
    render() {
        return <Modal className="filter-modal" centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader className="filter-modal-header">
                ORDENAR POR
            </ModalHeader>
            <ModalBody>
                <div className="d-flex flex-column">
                    {this.props.orderOptions.map(orderOption => {
                        return <Button onClick={() => this.props.changeOrder(orderOption)}>{orderOption.display}</Button>
                    })}
                </div>
            </ModalBody>
        </Modal>
    }
}

export default OrderModal;