import React, {Component} from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import './css/App.css';
import {LoginForm} from "./loginRegister/LoginForm";
import {RegisterForm} from "./loginRegister/RegisterForm";
import MyMalfunctionDetail from "./malfunction/MyMalfunctionDetail"
import NavigationBar from "./util/NavigationBar";
import UserStorage from "./util/UserStorage";
import MalfunctionsList from "./malfunction/MalfunctionsList";
import AddMalfunction from "./malfunction/AddMalfunction";
import MalfunctionDetail from "./malfunction/MalfunctionDetail";
import SpecialistList from "./specialistProfile/SpecialistList";
import SpecialistDetails from "./specialistProfile/SpecialistDetails";
import CreateSpecialistProfile from "./specialistProfile/CreateSpecialistProfile";
import Account from "./user/Account";
import MyMalfunctions from "./malfunction/MyMalfunctions";
import MyJobs from "./specialistProfile/MyJobs";

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
                <Route exact path={"/malfunction/:id"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<MalfunctionDetail {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/specialists"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<SpecialistList {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/specialist/:id"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<SpecialistDetails {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/create/specialist"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<CreateSpecialistProfile {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/my-account"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<Account {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/my-malfunctions"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<MyMalfunctions {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/my-jobs"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<MyJobs {...props} userdata={UserStorage} />) )}/>
                <Route exact path={"/my-malfunctions/:id"} render={(props) => (
                    !UserStorage.isLoggedIn() ? (<Redirect to="/login"/>) : (<MyMalfunctionDetail {...props} userdata={UserStorage} />) )}/>
            </Switch>

        </React.Fragment>

  )
  }
}

export default App;
