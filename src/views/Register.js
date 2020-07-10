import React from 'react'
import { Container } from 'reactstrap'
import Logo from '../logo.svg'


class Register extends React.Component {
    render() {
        return  <Container fluid className="register-container d-flex flex-column align-items-center">
            <div className="register-card-container d-flex justify-content-center">
                <div className="register-card d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <img className="register-image" src={Logo} alt="LG logo"/>
                        <h1 className="register-title">CYBERDAY LG</h1>
                        <span className="register-text">APROVECHA TU TIEMPO</span>
                        <span className="register-text">Y <b>#SALTATELAFILA</b></span>
                    </div>
                </div>
            </div>
            <iframe width="540" height="305" title="register" className="register-iframe"
                    src="https://8618a246.sibforms.com/serve/MUIEAKmdW46DnXbgzeS0Jxz8OM3rHxXY6x5r0HqRgqTfXlsHcI80iegPOW7uOK5nVE_ieCyQfHyd6VAfE_H9hk6GblNz2QLkW_i9cled5FNskt2G0w_UiDs7zzzQUY6uiAs25gThITFV5MBbUj_DONP2V75iqJC0XTacifQdJ_8txFdviSDpyBBWlvzBx0mMGXvBRc4EP9J2o1h0"
                    frameBorder="0" scrolling="auto" allowFullScreen/>
        </Container>
    }
}

export default Register