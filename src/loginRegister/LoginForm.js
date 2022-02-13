import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../css/LoginForm.css';
import UserStorage from "../util/UserStorage";


export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
    }

    async login() {
        const email = document.getElementById('logemail').value;
        const pass = document.getElementById('logpass').value;
        axios.post(process.env.REACT_APP_SERVER + '/logon',{
            email: email,
            password: pass
        }).then((response) => {
            UserStorage.login(response.data.roleLevel, response.data.token, response.data.userId, response.data.specId)
            this.props.history.push('/');
            window.location.reload(false);
        }).catch((error) => {
            console.error(error.message)
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
                    <div>
                        <Link to={"/register"} className={"nav-link"}>
                            <div className={"login-swap"}>Nie posiadam konta</div>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}