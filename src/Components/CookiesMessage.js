import React from 'react';
import {setCookie, parseCookies} from "nookies";
import {Container, Button} from 'reactstrap';


class CookiesMessage extends React.Component {
    constructor(props) {
        super(props);
        const cookies = parseCookies();
        this.state = {
            accepted: cookies['cookiesAgree']
        }
    }

    onAcceptClick = () => {
        setCookie([], 'cookiesAgree', 'True', {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        this.setState({
            accepted: true
        })
    }

    render() {
        if (this.state.accepted) {
            return null
        }

        return <Container fluid id="cookiesMessage" className="cookies-message">
            <p className="cookies-message-text">Este sitio web recopila cookies para brindarle una experiencia mejorada y personalizada. Las cookies recopiladas no se utilizarán para ningún otro propósito que no sea el descrito en nuestras políticas.<br/>
                Al continuar navegando por el sitio, acepta nuestro uso de cookies. Consulte nuestra Política de privacidad y cookies para obtener más información. <a href="https://www.lg.com/cl/privacy" className="cookies-message-link" target="_blank" rel="noopener noreferrer">Ver nuestra Politica de Privacidad y uso de Cookie.</a></p>
            <Button close className="cookies-message-accept" onClick={this.onAcceptClick}/>
        </Container>
    }
}

export default CookiesMessage;