import React from 'react'
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'

import fetch from 'isomorphic-unfetch'
import Logo from '../logo.svg'

import 'react-toastify/dist/ReactToastify.css';
import {settings} from "../settings";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            lists: [],
            optIn1: false,
            optIn2: false,
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
            "listIds": state.lists,
            "attributes": {
                "FIRSTNAME": state.firstName,
                "LASTNAME": state.lastName,
                "OPT_IN": true
            }
        }

        const createEndpoint = 'https://api.sendinblue.com/v3/contacts';
        const init = {
            method: 'POST',
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json',
                'Acept': 'application/json',
                'api-key': settings.sibKey
            }
        };

        fetch(createEndpoint, init).then(async res => {
            const jsonResponse = await res.json();
            if (!res.ok) {
                // try to add to list
                if (jsonResponse.message === 'Invalid email address') {
                    toast.error('Correo electronico Invalido')
                } else {
                    for (const listId of state.lists) {
                        const addToListEndpoint = `https://api.sendinblue.com/v3/contacts/lists/${listId}/contacts/add`;
                        const jsonData = {
                            "emails": [this.state.email]
                        }
                        const init = {
                            method: 'POST',
                            body: JSON.stringify(jsonData),
                            headers: {
                                'Content-Type': 'application/json',
                                'Acept': 'application/json',
                                'api-key': settings.sibKey
                            }
                        }
                        fetch(addToListEndpoint, init).then(res => {})
                    }
                    toast.success('Suscripción exitosa')
                }
            } else {
                toast.success('Suscripción exitosa')
            }
        })
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
                    <Form>
                        <Input className="mb-3" placeholder="Nombre" onChange={(e) => this.onInputChange('firstName', e)}/>
                        <Input className="mb-3" placeholder="Apellido" onChange={(e) => this.onInputChange('lastName', e)}/>
                        <Input className="mb-3" placeholder="Correo" onChange={(e) => this.onInputChange('email', e)}/>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={() => this.onListChange(3)}/>
                                Televisores
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={() => this.onListChange(4)}/>
                                Lavadoras y Refrigeradores
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={(e) => this.togglePrivacy('optIn1')}/>
                                He leído y acepto la Política de Privacidad
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={(e) => this.togglePrivacy('optIn2')}/>
                                Deseo recibir comunicaciones comerciales en los términos previstos en la Política de Privacidad
                            </Label>
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                            <Button className="mt-3" type="button" onClick={this.submit}>Enviar</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    }
}

export default Register