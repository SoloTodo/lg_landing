import React from 'react';
import {
    Container,
    Card, CardHeader, CardBody,
    Form, FormGroup, Label, Input, Button,
    Modal, ModalBody
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import {fetchJson} from "../react-utils/utils";

import Logo from '../logo.svg';
import 'react-toastify/dist/ReactToastify.css';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            lists: [3, 4, 5],
            optIn1: false,
            optIn2: false,
            invalidOptions: [],
            successModalOpen: false,
        }
    }

    submit = () => {
        const state = this.state;
        if (state.firstName === "") {
            toast.error('Nombre Requerido.')
            return
        } else if (state.lastName === "") {
            toast.error('Apellido Requerido.')
            return
        } else if (state.email === "") {
            toast.error('Email Requerido.')
            return
        } else if (state.lists.length === 0) {
            toast.error('Debe subscribirse por lo menos a una lista.')
            return
        } else if (!state.optIn1 || !state.optIn2) {
            toast.error('Debe aceptar las políticas de privacidad.')
            return
        }

        const jsonData = {
            "email": state.email,
            "updateEnabled": true,
            "listIds": state.lists,
            "attributes": {
                "FIRSTNAME": state.firstName,
                "LASTNAME": state.lastName,
                "OPT_IN": true
            }
        }

        const apiEndpoint = 'lg_pricing/sendinblue/contacts/';
        const init = {
            method: 'POST',
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        fetchJson(apiEndpoint, init).then(res => {
            this.openSuccessModal();
            window.sendinblue.identify(state.email, {
                FIRSTNAME: state.firstName,
                LASTNAME: state.lastName,
            })
        }).catch(async err => {
            const jsonError = await err.json()
            toast.error(jsonError.message)
        })
    }

    openSuccessModal = () => {
        this.setState({
            successModalOpen: true
        })
    }

    validateInput = (key) => {
        if(this.state[key] === "") {
            if (!this.state.invalidOptions.includes(key)) {
                this.setState({
                    invalidOptions: [...this.state.invalidOptions, key]
                })
            }
        } else {
            this.setState({
                invalidOptions: this.state.invalidOptions.filter(option => option !== key)
            })
        }
    }

    validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const email = this.state.email;
        const isValid =  re.test(email);
        if(isValid && this.state.invalidOptions.includes('email')) {
            this.setState({
                invalidOptions: this.state.invalidOptions.filter(option => option !== 'email')
            })
        } else if (!isValid && !this.state.invalidOptions.includes('email')) {
            this.setState({
                invalidOptions: [...this.state.invalidOptions, 'email']
            })
        }
    }

    onInputChange = (key, e) => {
        this.setState({
            [key]: e.target.value
        })
    }

    onListChange = (listId) => {
        let newLists = [...this.state.lists]
        if (newLists.includes(listId)) {
            newLists = newLists.filter(id => id !== listId)
        } else {
            newLists.push(listId)
        }
        this.setState({
            lists: newLists
        })
    }

    togglePrivacy = (key) => {
        this.setState({
            [key]: !this.state[key]
        })
    }

    render() {
        return  <Container fluid className="register-container d-flex flex-column align-items-center justify-content-center">
            <ToastContainer
                position="top-right"
                type="default"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
            <Modal centered isOpen={this.state.successModalOpen}>
                <ModalBody className="d-flex flex-column align-items-center">
                    <p className="register-end-text"><b>¡Gracias por registrarte!</b> <br/> El día del Cyber te haremos llegar nuestras mejores ofertas.</p>
                    <a href="https://www.lg.com/cl" className="btn btn-success register-end-button">Ir a LG</a>
                </ModalBody>
            </Modal>
            <Card>
                <CardHeader className="register-card-container d-flex justify-content-center">
                    <div className="register-card d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <img className="register-image" src={Logo} alt="LG logo"/>
                            <h1 className="register-title">CYBERDAY LG</h1>
                            <span className="register-text">APROVECHA TU TIEMPO</span>
                            <span className="register-text">Y <b>#SALTATELAFILA</b></span>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <p className="register-content-text pt-2 pb-2">Ya llega <strong>Cyberday</strong> y <strong>LG</strong> tiene las mejores ofertas para ti. Se el primero en comprar saltándote la fila, ingresa tus datos y listo!</p>
                    <Form>
                        <Input
                            invalid={this.state.invalidOptions.includes('firstName')}
                            className="register-input mb-3"
                            placeholder="Nombre"
                            onChange={(e) => this.onInputChange('firstName', e)}
                            onBlur={() => this.validateInput('firstName')}
                        />
                        <Input
                            invalid={this.state.invalidOptions.includes('lastName')}
                            className="register-input mb-3"
                            placeholder="Apellido"
                            onChange={(e) => this.onInputChange('lastName', e)}
                            onBlur={() => this.validateInput('lastName')}
                        />
                        <Input
                            invalid={this.state.invalidOptions.includes('email')}
                            type="email"
                            className="register-input mb-3"
                            placeholder="Correo"
                            onChange={(e) => this.onInputChange('email', e)}
                            onBlur={this.validateEmail}
                        />
                        <p className="register-content-title">¿De que productos quieres recibir ofertas?</p>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" checked={this.state.lists.includes(3)} onChange={() => this.onListChange(3)}/>
                                Televisores
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" checked={this.state.lists.includes(4)} onChange={() => this.onListChange(4)}/>
                                Lavadoras y Refrigeradores
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" checked={this.state.lists.includes(5)} onChange={() => this.onListChange(5)}/>
                                Celulares
                            </Label>
                        </FormGroup>
                        <p className="register-content-title">Politica de Privacidad</p>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={(e) => this.togglePrivacy('optIn1')}/>
                                He leído y acepto la <a href="https://www.lg.com/cl/privacy" rel="noopener noreferrer" target="_blank">Política de Privacidad</a>
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={(e) => this.togglePrivacy('optIn2')}/>
                                Deseo recibir comunicaciones comerciales en los términos previstos en la <a href="https://www.lg.com/cl/privacy" rel="noopener noreferrer" target="_blank">Política de Privacidad</a>
                            </Label>
                        </FormGroup>
                        <p className="register-content-message">Estos servicios son para mayores de 18 años</p>
                        <div className="d-flex justify-content-center">
                            <Button className="register-button  mt-3" type="button" onClick={this.submit}>Enviar</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    }
}

export default Register