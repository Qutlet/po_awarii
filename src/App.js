import logo from './logo.svg';
import React, {Component} from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import {LoginForm} from "./LoginForm";
import {RegisterForm} from "./RegisterForm";


import NavigationBar from "./NavigationBar";
import UserStorage from "./UserStorage";
import MalfunctionsList from "./MalfunctionsList";
import AddMalfunction from "./AddMalfunction";

class App extends Component{
  render() {
    return (

            <React.Fragment>
            <Route
                render={ (props) =>(
                    <NavigationBar {...props} userdata={UserStorage} />
                )}
            />

            <Switch>
                <Route exact path={"/login"} component={LoginForm} />
                <Route exact path={"/register"} component={RegisterForm} />
                <Route exact path={"/malfunctions"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<MalfunctionsList {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/malfunctions/add"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<AddMalfunction {...props} userdata={UserStorage} />) )}/>
            </Switch>

        </React.Fragment>

  )
  }
}

export default App;
