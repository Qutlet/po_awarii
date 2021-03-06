import React, {Component} from "react";
import axios from "axios";
import UserStorage from "../util/UserStorage";
import {Link} from "react-router-dom";
import CategoryChooser from "../Category/CategoryChooser";
import DeadlineChooser from "./DeadlineChooser";

export default class MyMalfunctionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id:  this.props.match.params.id,
            malfunction: {},
            specialists: [],
            specialist: {}
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    handleSubmit = (obj) => {
        obj.preventDefault()
        this.chooseSpec(obj.target.id)
        this.setState({ show: false });
    };

    componentDidMount() {
        const specialists = this.state.specialists;
        const id = this.state.id;
        axios.get(process.env.REACT_APP_SERVER + '/malfunctions/' + id + '/malfunction', {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then(r => {
            this.setState({
                malfunction: r.data
            })
            if (r.data.specialistId) {
                axios.get(process.env.REACT_APP_SERVER + '/specProfile/' + r.data.specialistId + '/profile', {
                    headers: {
                        'Authorization': 'Token ' + this.props.userdata.token
                    }
                }).then(resp => {
                    this.setState({
                        specialist: resp.data
                    })
                })
            }
            for (let i = 0; i < r.data.specialistIds.length; i++) {
                axios.get(process.env.REACT_APP_SERVER + '/specProfile/' + r.data.specialistIds[i] + '/profile', {
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
        axios.put(process.env.REACT_APP_SERVER + '/malfunctions/malfunction/' + this.state.id + '/specialist/' + id + '/uninterested', {}, {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then( r => console.log(r.data))
        window.location.reload(false)
        window.history.push('/my-malfunctions')
    }

    chooseSpec = (id) => {
        axios.put(process.env.REACT_APP_SERVER + '/malfunctions/malfunction/' + this.state.id + '/deadline/' + id + '/chosen', {}, {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then( r => console.log(r.data))
        window.location.reload(false)
    }

    endWork = () => {
        axios.put(process.env.REACT_APP_SERVER + '/malfunctions/malfunction/' + this.state.id + '/workEnded', {}, {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then( r => console.log(r.data))
        window.location.reload(false)
    }

    chat = (id) => {

    }

    renderSpecialists = () => {
        if (this.state.specialists.length === 0) {
            return (
                <div>
                    <h3>
                        Niestety jeszcze ??aden specialista nie jest zainteresowny tym zg??oszeniem
                    </h3>
                </div>
            )
        }

        return this.state.specialists.map(specialists => {
            console.log(specialists)
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
                        <button onClick={() => this.deleteSpec(specialists.id)}>Odrzu??</button>
                        <Link to={{
                            pathname: '/messages/' + specialists.userId ,
                            state: {
                                creatorId: specialists.userId
                            }
                        }}>
                            <button>
                                <span>Kontakt</span>
                            </button>
                        </Link>
                        <DeadlineChooser show={this.state.show} handleClose={this.hideModal} token={this.props.userdata.token} handleSubmit={this.handleSubmit} data={specialists.deadlineList}>
                        </DeadlineChooser>
                        <button type="button" onClick={this.showModal}>
                            Wybierz
                        </button>
                        {/*<button onClick={() => this.chooseSpec(specialists.userId)}>Wybierz</button>*/}
                    </div>
                </div>
            )
        })
    }

    renderMidDiv = () => {
        if(this.state.malfunction.status === "IN_WORK") {
            return (
                <div>
                    <div style={{textAlign: "center"}}>
                        <h2>Wykonawca</h2>
                    </div>
                    <div style={{
                        marginLeft: "15%",
                        marginRight: "15%",
                        textAlign: "center",
                        border: "solid",
                        borderColor: "rgba(105,85,85,0.45)"
                    }}>
                        <div style={{display: "flex",justifyContent: "space-between"}}>
                            <div>
                                <Link to={{
                                    pathname: '/specialist/' + this.state.specialist.id ,
                                    state: {
                                        id: this.state.specialist.id
                                    }
                                }}>
                                    <h4>{this.state.specialist.customProfileName}: {this.state.specialist.firstName} {this.state.specialist.lastName}</h4>
                                </Link>
                            </div>
                            <div>
                                <button onClick={() => this.endWork()}>Zako??cz</button>
                                <Link to={{
                                    pathname: '/messages/' + this.state.specialist.userId ,
                                    state: {
                                        creatorId: this.state.specialist.userId
                                    }
                                }}>
                                    <button className={'kontakt'} >
                                        <span>Kontakt</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.malfunction.status === "PENDING") {
            return (
                <div>
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
            )
        }
        if (this.state.malfunction.status === "ENDED") {
            return (
                <div>
                    <div style={{textAlign: "center"}}>
                        <h2>Wykonawca</h2>
                    </div>
                    <div style={{
                        marginLeft: "15%",
                        marginRight: "15%",
                        textAlign: "center",
                        border: "solid",
                        borderColor: "rgba(105,85,85,0.45)"
                    }}>
                        <div style={{display: "flex",justifyContent: "space-between"}}>
                            <div>
                                <Link to={{
                                    pathname: '/specialist/' + this.state.specialist.id ,
                                    state: {
                                        id: this.state.specialist.id
                                    }
                                }}>
                                    <h4>{this.state.specialist.customProfileName}: {this.state.specialist.firstName} {this.state.specialist.lastName}</h4>
                                </Link>
                            </div>
                            <Link to={{
                                pathname: '/messages/' + this.state.specialist.userId ,
                                state: {
                                    creatorId: this.state.specialist.userId
                                }
                            }}>
                                <button className={'kontakt'} >
                                    <span>Kontakt</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
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
                {this.renderMidDiv()}
            </div>
        );
    }

}