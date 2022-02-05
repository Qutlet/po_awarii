import React, {Component} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import UserStorage from "./UserStorage";
import "../css/navbar.css"

export default class NavigationBar extends Component{
    constructor(props) {
        super(props);
    }

    logout = () => {
        UserStorage.logout()
        this.props.history.push('/login')

    }

    notLogIn = () => {
        return (
            <nav className="navWrapper">
                <Link to= '/register'>
                    <div className={"navButtonRegister"}>
                        Zarejestruj
                    </div>
                </Link>
                <Link to= '/login'>
                    <div className={"navButtonLogin"}>
                        Zaloguj
                    </div>
                </Link>
            </nav>

        );
    }

    specRender = () => {
        return (
        <nav className="navWrapper">
            <div className={"dropdown"}>
                <img style={{width: "40px"}} src={"menu.png"}  alt={"menu"}/>
                <div className="dropdown-content">
                    <Link className={"styledLinkInDown"} to={'/malfunctions/add'}>
                        <div>Zgłoś awarie</div>
                    </Link>
                    <Link className={"styledLinkInDown"}  to={'/malfunctions'}>
                        <div>Awarie</div>
                    </Link>
                    <Link className={"styledLinkInDown"}  to={'/my-malfunctions'}>
                        <div>Moje zgłoszenia</div>
                    </Link>
                    <Link className={"styledLinkInDown"}  to={'/specialists'}>
                        <div>Specjaliści</div>
                    </Link>
                    <Link className={"styledLinkInDown"}  to={'/my-jobs'}>
                        <div>Moje zlecenia</div>
                    </Link>
                    <Link className={"styledLinkInDown"}  to={'/my-account'}>
                        <div>Konto</div>
                    </Link>
                </div>
            </div>
            <Link className={"styledLink"} to={'/malfunctions/add'}>
                <div className={"navItem"}>Zgłoś awarie</div>
            </Link>
            <Link className={"styledLink"}  to={'/malfunctions'}>
                <div className={"navItem"}>Awarie</div>
            </Link>
            <Link className={"styledLink"}  to={'/my-malfunctions'}>
                <div className={"navItem"}>Moje zgłoszenia</div>
            </Link>
            <Link className={"styledLink"}  to={'/specialists'}>
                <div className={"navItem"}>Specjaliści</div>
            </Link>
            <Link className={"styledLink"}  to={'/my-jobs'}>
                <div className={"navItem"}>Moje zlecenia</div>
            </Link>
            <Link className={"styledLink"}  to={'/my-account'}>
                <div className={"navItem"}>Konto</div>
            </Link>
            <Link to= '/login'>
                <div className={"navButtonLogin"} onClick={this.logout}>
                    Wyloguj
                </div>
            </Link>
        </nav>
        )
    }

    logIn = () => {
        return (
            <nav className="navWrapper">
                <div className={"dropdown"}>
                    <img style={{width: "40px"}} src={"menu.png"}  alt={"menu"}/>
                    <div className="dropdown-content">
                        <Link className={"styledLinkInDown"} to={'/malfunctions/add'}>
                            <div>Zgłoś awarie</div>
                        </Link>
                        <Link className={"styledLinkInDown"}  to={'/my-malfunctions'}>
                            <div>Moje zgłoszenia</div>
                        </Link>
                        <Link className={"styledLinkInDown"}  to={'/specialists'}>
                            <div>Specjaliści</div>
                        </Link>
                        <Link className={"styledLinkInDown"}  to={'/create/specialist'}>
                            <div>Jestem specjalistą</div>
                        </Link>
                        <Link className={"styledLinkInDown"}  to={'/my-account'}>
                            <div>Konto</div>
                        </Link>
                    </div>
                </div>
                <Link className={"styledLink"}  to={'/malfunctions/add'}>
                    <div className={"navItem"}>Zgłoś awarie</div>
                </Link>
                <Link className={"styledLink"}  to={'/my-malfunctions'}>
                    <div className={"navItem"}>Moje zgłoszenia</div>
                </Link>
                <Link className={"styledLink"}  to={'/specialists'}>
                    <div className={"navItem"}>Specjaliści</div>
                </Link>
                <Link className={"styledLink"}  to={'/create/specialist'}>
                    <div className={"navItem"}>Jestem specjalistą</div>
                </Link>
                <Link className={"styledLink"}  to={'/my-account'}>
                    <div className={"navItem"}>Konto</div>
                </Link>
                <Link to= '/login'>
                    <div className={"navButtonLogin"} onClick={this.logout}>
                        Wyloguj
                    </div>
                </Link>
            </nav>
        )
    }

    render() {
        if (this.props.userdata.isLoggedIn()) {
            console.log(this.props.userdata)
            if (this.props.userdata.isSpec()){
                return this.specRender();
            }
            return this.logIn()
        } else {
            return this.notLogIn()
        }
 }
}

const NavItem = styled.div`
    margin-left: 30px;
    color: black;
    font-size: x-large;
    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    &:hover {
        color: black;
    }
    color: white;
`

const NavButtonLogin = styled.div`
    position: absolute;
    right: 15px;
    top : 15px;
    color: white;
    border: 2px solid black;
    padding: 20px;
    background-color: black;
    border-radius: 10%;
    transition: 0.5s;
    &:hover{
        cursor: pointer;
        background-color: gold;
        color: black;
      transition: 0.5s;
    }
`

const NavButtonRegister = styled.div`
    position: absolute;
    right: 120px;
    top : 15px;
    color: white;
    border: 2px solid black;
    padding: 20px;
    background-color: black;
    border-radius: 10%;
    transition: 0.5s;
    &:hover{
        cursor: pointer;
        background-color: gold;
        color: black;
        transition: 0.5s;
    }
`


const NavWrapper = styled.nav`
    background:var(--mainGold);
    .nav-link{
        color:var(--mainWhite) !important;
        font-size:1.3rem;
        text-transform:capitalze;
}
`