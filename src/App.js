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
import MalfunctionDetail from "./MalfunctionDetail";
import axios from "axios";
import SpecialistList from "./SpecialistList";
import SpecialistDetails from "./SpecialistDetails";
import CreateSpecialistProfile from "./CreateSpecialistProfile";

class App extends Component{

    // send = (event) => {
    //     var bodyFormData = new FormData()
    //     bodyFormData.append('senderId', 'Fred');
    //     bodyFormData.append('file', event.target.files[0]);
    //     axios({
    //         method: "post",
    //         url: "http://localhost:8080/file/upload",
    //         data: bodyFormData,
    //         headers: { "Content-Type": "multipart/form-data" },
    //     })
    //         .then(function (response) {
    //             //handle success
    //             console.log(response);
    //         })
    //         .catch(function (response) {
    //             //handle error
    //             console.log(response);
    //         })
    // }

  render() {
    return (
            <React.Fragment>
            <Route
                render={ (props) =>(
                    <NavigationBar {...props} userdata={UserStorage} />
                )}
            />


                {/*<div>*/}

                {/*    <label>Photos: </label>*/}
                {/*    <input type="file" name="image" accept="image/png, image/jpeg" onInput={this.send}/>*/}

                {/*</div>*/}

                {/*<img src="http://localhost:8080/file/download/99d975b5-0fb5-4147-abef-311b933bb6c3" alt="alternatetext"/>*/}


            <Switch>
                <Route exact path={"/login"} component={LoginForm} />
                <Route exact path={"/register"} component={RegisterForm} />
                <Route exact path={"/malfunctions"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<MalfunctionsList {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/malfunctions/add"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<AddMalfunction {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/malfunction/:id"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<MalfunctionDetail {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/specialists"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<SpecialistList {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/specialist/:id"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<SpecialistDetails {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/create/specialist"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<CreateSpecialistProfile {...props} userdata={UserStorage} />) )}/>
            </Switch>

        </React.Fragment>

  )
  }
}

export default App;
