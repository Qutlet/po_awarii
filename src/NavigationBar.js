import React, {Component} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components'

export default class NavigationBar extends Component{
 render() {
     return (
         <NavWrapper className="nav-bar">
             <Link to= '/register'>
                 <NavButtonRegister>
                     Zarejestruj
                 </NavButtonRegister>
             </Link>
             <Link to= '/login'>
                 <NavButtonLogin>
                      Zaloguj
                 </NavButtonLogin>
             </Link>
         </NavWrapper>

     );
 }
}

const NavItem = styled.div`
    margin-left: 30px;
    color: white;

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