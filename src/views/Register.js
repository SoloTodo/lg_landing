import React from 'react'


class Register extends React.Component {
    render() {
        const iframeStyle = {
            position: 'fixed',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            height: '100%',
        }

        return  <iframe width="540" height="305" title="register"
                        src="https://8618a246.sibforms.com/serve/MUIEALfKUU9rFfDyDTurSZDkojnjUTYxNPjYE45t0KOgqNzBhQGXUb04Kk7WR02cXtzzt_Zx-70liae1ZNBNNRgGmotQPXMIMEDbMYbSX76BWMso-d-N2a7SJ64k79UjRszpf8MLk7zexVxOat0Yyykdvh25-y9QIzO0z5_P6B3LgUmQsVCffhTudN9gh0RR0vPX1vO-Mip6JRqt"
                        frameBorder="0" scrolling="auto" allowFullScreen
                        style={iframeStyle}/>
    }
}

export default Register