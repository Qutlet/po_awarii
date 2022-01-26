import React, {Component} from "react";
import axios from "axios";
import "../css/Details.css"
import UserStorage from "../util/UserStorage";
import {Link} from "react-router-dom";

export default class MalfunctionDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id:  this.props.match.params.id,
            malfunction: null
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount = () => {
        const id = this.state.id;
        axios.get('https://po-awarii.herokuapp.com/malfunctions/' + id + '/malfunction', {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then(r => {
            console.log(r.data)
            this.setState({
                malfunction: r.data
            })
        }).catch(e => {
            if (e.response === undefined){
                return;
            }
            if (e.response.status) {
                UserStorage.logout();
                return;
            }
            this.componentDidMount()
        })
    }

    intrested = () => {
        if (this.props.userdata.isSpec()) {
            return (
                <div>
                    <button className={'intrested'} onClick={this.specIntr}>
                        <span>Jestem zainteresowany</span>
                    </button>
                </div>
            )
        }
    }

    specIntr = () => {
        const malfunctionID = this.state.id;
        axios.put("https://po-awarii.herokuapp.com/malfunctions/malfunction/" + malfunctionID + "/specialist/interested", {},{
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then(r => {
            console.log(r)
        })
    }


    render() {
        if (this.state.malfunction == null) {
            return (
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )
        }
        return (
            <div style={{textAlign : "center"}} className="container py-5">

                <div className="row">
                    <div className="col-10 mx-auto text-center text slanted text-blue my-5">
                        <h1 style={{
                            textAlign: "center"
                        }}>Awaria {this.state.malfunction.name}</h1>
                    </div>
                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                        <h2 style={{
                            textAlign: "center"
                        }} className="text-title text uppercas text mudted mt-3 mb-2">
                            <span className="text-uppercase">{this.state.malfunction.description}</span>
                        </h2>
                        <h6 style={{
                            textAlign: "center",
                            margin: "unset"
                        }} >
                            <span>Lokalizacja</span>
                        </h6>
                        <h4 style={{
                            textAlign: "center"
                        }} className="text-title text uppercas text mudted mt-3 mb-2">
                            <span className="text-uppercase">{this.state.malfunction.location}</span>
                        </h4>
                        <h6 style={{
                            textAlign: "center",
                            margin: "unset"
                        }} >
                            <span>Kategorie</span>
                        </h6>
                        <h4 style={{
                            textAlign: "center"
                        }} className="text-title text uppercas text mudted mt-3 mb-2">
                            <span className="text-uppercase">{this.state.malfunction.categories}</span>
                        </h4>
                    </div>
                    <div>
                        <h3 style={{
                            textAlign: "center"
                        }} className="text-title text uppercas text mudted mt-3 mb-2">
                            <span>Zgłaszający:</span>
                        </h3>
                        <h4 style={{
                            textAlign: "center",
                            margin: "unset"
                        }} className="text-title text uppercas text mudted mt-3 mb-2">
                            <span className="text-uppercase">Numer telefonu: {this.state.malfunction.phoneNumber}</span>
                        </h4>
                        <h4 style={{
                            textAlign: "center",
                            margin: "unset"
                        }} className="text-title text uppercas text mudted mt-3 mb-2">
                            <span className="text-uppercase">Adres email: {this.state.malfunction.email}</span>
                        </h4>
                        <Link to={{
                            pathname: '/messages/' + this.state.malfunction.creatorId ,
                            state: {
                                creatorId: this.state.malfunction.creatorId
                            }
                        }}>
                            <button className={"kontakt"}>
                                <span>Kontakt</span>
                            </button>
                        </Link>
                        {this.intrested()}
                    </div>
                </div>
            </div>
        )
    }

}