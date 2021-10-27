import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import './LoginForm.css';


export class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    login() {
        const email = document.getElementById('logemail').value;
        const pass = document.getElementById('logpass').value;
        axios.post('http://localhost:8080/logon',{
            email: email,
            password: pass
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error.message)
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={'logowanko'}>
                    <h3 className={''}>Logowanie</h3>
                    <div >
                        <input type="email" name="logemail" className={'login-input'} placeholder="Your Email" id="logemail" autoComplete="off"/>
                    </div>
                    <div>
                        <input type="password" name="logpass" className={'login-input'} placeholder="Your Password" id="logpass" autoComplete="off"/>
                    </div>
                    <div>
                        <button className={'login-button'} onClick={this.login} >
                            <span>Zaloguj</span>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}