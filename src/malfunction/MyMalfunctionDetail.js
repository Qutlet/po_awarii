import React, {Component} from "react";
import axios from "axios";
import UserStorage from "../util/UserStorage";
import {Link} from "react-router-dom";

export default class MyMalfunctionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:  this.props.match.params.id,
            malfunction: {},
            specialists: []
        }
    }

    componentDidMount() {
        const specialists = this.state.specialists;
        const id = this.state.id;
        axios.get('http://localhost:8080/malfunctions/' + id + '/malfunction', {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then(r => {
            this.setState({
                malfunction: r.data
            })
            for (let i = 0; i < r.data.specialistIds.length; i++) {
                axios.get('http://localhost:8080/specProfile/' + r.data.specialistIds[i] + '/profile', {
                    headers: {
                        'Authorization': 'Token ' + this.props.userdata.token
                    }
                }).then(res => {
                    specialists.push(res.data);
                    this.setState({
                        specialists: specialists
                    })
                })
            }
        }).catch(e => {
            // if (e.response === undefined){
            //     return;
            // }
            // if (e.response.status) {
            //     UserStorage.logout();
            //     return;
            // }
            // this.componentDidMount()
        })

    }

    deleteSpec = (id) => {
        axios.put("http://localhost:8080/malfunctions/malfunction/" + this.state.id + "/specialist/" + id + "/uninterested", {}, {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then( r => console.log(r.data))
        window.location.reload(false)
        window.history.push('/my-malfunctions')
    }

    chooseSpec = (id) => {
        axios.put("http://localhost:8080/malfunctions/malfunction/" + this.state.id + "/specialist/" + id + "/chosen", {}, {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then( r => console.log(r.data))
        window.location.reload(false)
    }

    renderSpecialists = () => {
        if (this.state.specialists.length === 0) {
            return (
                <div>
                    <h3>
                        Niestety jeszcze żaden specialista nie jest zainteresowny tym zgłoszeniem
                    </h3>
                </div>
            )
        }

        return this.state.specialists.map(specialists => {
            return (
                <div style={{display: "flex",justifyContent: "space-between"}}>
                    <div>
                        <Link to={{
                            pathname: '/specialist/' + specialists.id ,
                            state: {
                                id: specialists.id
                            }
                        }}>
                            <h4>{specialists.customProfileName}: {specialists.firstName} {specialists.lastName}</h4>
                        </Link>
                    </div>
                    <div>
                        <button onClick={() => this.deleteSpec(specialists.id)}>Odrzuć</button>
                        <button onClick={() => this.chooseSpec(specialists.id)}>Kontakt</button>
                        <button onClick={() => this.chooseSpec(specialists.id)}>Wybierz</button>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (this.state.malfunction === {} || this.state.specialists === []) {
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
            <div>
                <div style={{
                    margin: "5%",
                    marginBottom: "0%",
                    textAlign: "center",
                    border: "solid",
                    borderColor: "rgba(105,85,85,0.45)"
                }}>
                    <div style={{display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div style={{marginLeft: "45%"}}>
                            <h2>{this.state.malfunction.name}</h2>
                        </div>
                        <div>
                            <h4>Status: {this.state.malfunction.status}</h4>
                        </div>
                    </div>
                </div>
                <div style={{
                    marginLeft: "15%",
                    marginRight: "15%",
                    textAlign: "center",
                    border: "solid",
                    borderColor: "rgba(105,85,85,0.45)"
                }}>
                    <div style={{display: "flex"
                    }}>
                        <div style={{paddingInline: "1%"}}>
                            <h5>Lokalizacja: {this.state.malfunction.location}</h5>
                        </div>
                        <div style={{paddingInline: "1%"}}>
                            <h5>Opis: {this.state.malfunction.description}</h5>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    <h2>Zainteresowani specjalisci</h2>
                </div>
                <div style={{
                    marginLeft: "15%",
                    marginRight: "15%",
                    textAlign: "center",
                    border: "solid",
                    borderColor: "rgba(105,85,85,0.45)"
                }}>
                    {this.renderSpecialists()}
                </div>
            </div>
        );
    }

}