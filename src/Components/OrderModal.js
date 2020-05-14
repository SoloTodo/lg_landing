import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

import { CheckSvg } from "../Icons";


class OrderModal extends React.Component {
    render() {
        return <Modal className="order-modal" centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader className="filter-modal-header">
                ORDENAR POR
            </ModalHeader>
            <ModalBody>
                <div className="d-flex flex-column">
                    {this.props.orderOptions.map(orderOption => {
                        return <Button key={orderOption.display} className="order-modal-button" onClick={() => this.props.changeOrder(orderOption)}>
                            <div className="d-flex justify-content-between">
                                <span>
                                    {orderOption.display}
                                </span>
                                {this.props.appliedOrder.name === orderOption.name?
                                    <span>
                                        <CheckSvg/>
                                    </span>:null}
                            </div>
                        </Button>
                    })}
                </div>
                <Button className="filter-modal-ready d-flex justify-content-center align-items-center" onClick={this.props.toggle}><span className="pr-1">LISTO</span><span><CheckSvg/></span></Button>
            </ModalBody>
        </Modal>
    }
}

export default OrderModal;