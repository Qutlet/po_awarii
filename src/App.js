import logo from './logo.svg';
import React, {Component} from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import {LoginForm} from "./LoginForm";


import NavigationBar from "./NavigationBar";

class App extends Component{
  render() {
    return (

            <React.Fragment>
            <Route
                render={ (props) =>(
                    <NavigationBar {...props} />
                )}
            />

            <Switch>
                <Route exact path="/login" component={LoginForm} />
            </Switch>

        </React.Fragment>

  )
  }
}

export default App;
