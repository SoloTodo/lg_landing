import React from "react";
import { Container, Button } from "reactstrap";

import Logo from "../logo.png";
import { ArrowUpSvg } from "../Icons";


class Footer extends React.Component {
    render() {
        return <React.Fragment>
            <Container className="footer-button-container d-flex justify-content-end">
                <Button className="footer-button" onClick={this.props.footerButtonClick}><ArrowUpSvg/></Button>
            </Container>
            <div className="footer">
                <div className="footer-logo d-flex align-content-center justify-content-center">
                    <img alt="LG logo" src={Logo}/>
                </div>
                <div className="footer-text d-flex align-content-center justify-content-center">
                    Todos los derechos reservados | 2020
                </div>
            </div>
        </React.Fragment>
    }
}

export default Footer