import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../css/LoginForm.css';
import InputField from '../util/InputField'

export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            mPassword: '',
            email: '',
            buttonDisabled: false,
            error: ''
        };
        this.setInputValue = this.setInputValue.bind(this)
        this.register = this.register.bind(this)
    }

    resetForm() {
        this.setState({
            buttonDisabled: false
        })
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    register() {
        this.setState({
            buttonDisabled:true
        })
        axios.post(process.env.REACT_APP_SERVER + '/registration', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            matchingPassword: this.state.mPassword,
            email: this.state.email
        }).then((response) => {
            this.props.history.push('/login');
            window.location.reload(false);
        }).catch((error) => {
            if (error.response.data.fieldErrors) {
                if (error.response.data.fieldErrors[0].defaultMessage === 'nie może być puste') {
                    this.setState({
                        error: 'Pole ' + error.response.data.fieldErrors[0].defaultMessage
                    })
                } else {
                    this.setState({
                        error: error.response.data.fieldErrors[0].defaultMessage
                    })
                }
            } else if (error.response) {
                this.setState({
                    error: error.response.data
                })
            }
        });
        this.resetForm();
    }

    render() {
        return (
            <React.Fragment>
                <div className={'logowanko'}>
                    <h3 className={''}>Rejestracja</h3>
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            className={'login-input'}
                            placeholder="Imię"
                            id="registerFirstName"
                            autoComplete="off"
                            value={this.state.firstName}
                            onChange={this.setInputValue}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            className={'login-input'}
                            placeholder="Nazwisko"
                            id="registerLastName"
                            autoComplete="off"
                            value={this.state.lastName}
                            onChange={this.setInputValue}
                        />
                    </div>
                    <div >
                        <input
                            type="email"
                            name="email"
                            className={'login-input'}
                            placeholder="Email"
                            id="registerEmail"
                            autoComplete="off"
                            value={this.state.email}
                            onChange={this.setInputValue}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            className={'login-input'}
                            placeholder="Hasło"
                            id="registerPassword"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.setInputValue}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="mPassword"
                            className={'login-input'}
                            placeholder="Hasło"
                            id="registerMPassword"
                            autoComplete="off"
                            value={this.state.mPassword}
                            onChange={this.setInputValue}
                        />
                    </div>
                    <div>
                        {this.state.error}
                    </div>
                    <div>
                        <button
                            className={'login-button'}
                            disabled={this.state.buttonDisabled}
                            onClick={this.register} >
                            <span>Zarejestruj</span>
                        </button>
                    </div>
                    <div>
                        <Link to={"/login"} className={"nav-link"}>
                            <div className={"login-swap"}>Posiadam konto</div>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}