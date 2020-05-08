import React from 'react'

import Logo from '../../logo.png'


class Footer extends React.Component {
    render() {
        return <div className="footer">
            <div className="footer-logo d-flex align-content-center justify-content-center">
                <img alt="LG logo" src={Logo}/>
            </div>
            <div className="footer-text d-flex align-content-center justify-content-center">
                Todos los derechos reservados | 2020
            </div>
        </div>
    }
}

export default Footer