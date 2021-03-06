import React, {Component} from "react";
import axios from "axios";
import "../css/Details.css"
import {Link} from "react-router-dom";
import MyMalfunctionObject from "../malfunction/MyMalfunctionObject";

export default class MyJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pending: [],
            inWork: [],
            ended: []
        }
    }

    removeInterested = (id) => {
        const specId = this.props.userdata.specId;
        axios.put(process.env.REACT_APP_SERVER + '/malfunctions/malfunction/' + id + '/specialist/' + specId + '/uninterested',{},{  headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }}).then(ignored => {})
    }

    componentDidMount() {
        const specId = this.props.userdata.specId;
        //PENDING
        axios.get(process.env.REACT_APP_SERVER + '/malfunctions/specialist/' + specId + '?status=PENDING', {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }) .then(r => {
            this.setState({
                pending: r.data
            })
        })
        //IN_WORK
        axios.get(process.env.REACT_APP_SERVER + '/malfunctions/specialist/' + specId + '?status=IN_WORK', {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }) .then(r => {
            this.setState({
                inWork: r.data
            })
        })
        //ENDED
        axios.get(process.env.REACT_APP_SERVER + '/malfunctions/specialist/' + specId + '?status=ENDED', {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }) .then(r => {
            this.setState({
                ended: r.data
            })
        })
    }

    renderPendingMalfunctions = () => {
        if(this.state.pending.length === 0){
            return (
                <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                    <span>Nie posiadasz ??adnych oczekujacych zlece??</span>
                    <Link to={{
                        pathname: '/malfunctions'}}>
                        <button>Przegl??daj zg??oszenia</button>
                    </Link>
                </div>
            )
        }
        return this.state.pending.map(malfunctions => {
            return (
                <div>
                    <div>
                        <Link to={{
                            pathname: '/malfunction/' + malfunctions.id ,
                            state: {
                                id: malfunctions.id
                            }
                        }}>
                            <div className="img-container p-5">

                                <div className="card-footer d-flex justify-content-between">
                                    <h4 className="align-self-center mb-0" style={{
                                        margin: "0px",
                                        fontSize: "1.5em"
                                    }}>
                                        {malfunctions.name}
                                    </h4>
                                    <p className="align-self-center mb-0">
                                        {malfunctions.categories.join(', ')}
                                    </p>
                                    <p className="align-self-center mb-0">
                                        {malfunctions.location}
                                    </p>
                                </div>
                                <div>
                                    <Link to={{
                                        pathname: '/messages/' + malfunctions.creatorId ,
                                        state: {
                                            creatorId: malfunctions.creatorId
                                        }
                                    }}>
                                        <button >
                                            <span>Kontakt</span>
                                        </button>
                                    </Link>
                                    <button onClick={() => {
                                        this.removeInterested(malfunctions.id)
                                    }}>Zrezygnuj</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })
    }

    renderInWorkMalfunctions = () => {
        if(this.state.inWork.length === 0){
            return (
                <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                    <span>Nie posiadasz ??adnych aktywnych zlece??</span>
                    <Link to={{
                        pathname: '/malfunctions'}}>
                        <button>Przegl??daj zg??oszenia</button>
                    </Link>
                </div>
            )
        }
        return this.state.inWork.map(malfunctions => {
                return (
                    <div>
                        <div>
                            <Link to={{
                                pathname: '/malfunction/' + malfunctions.id ,
                                state: {
                                    id: malfunctions.id
                                }
                            }}>
                                <div className="img-container p-5">

                                    <div className="card-footer d-flex justify-content-between">
                                        <h4 className="align-self-center mb-0" style={{
                                            margin: "0px",
                                            fontSize: "1.5em"
                                        }}>
                                            {malfunctions.name}
                                        </h4>
                                        <p className="align-self-center mb-0">
                                            {malfunctions.categories.join(', ')}
                                        </p>
                                        <p className="align-self-center mb-0">
                                            {malfunctions.location}
                                        </p>
                                    </div>
                                    <div>
                                        <Link to={{
                                            pathname: '/messages/' + malfunctions.creatorId ,
                                            state: {
                                                creatorId: malfunctions.creatorId
                                            }
                                        }}>
                                            <button className={'kontakt'} >
                                                <span>Kontakt</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
        })
    }

    renderEndedMalfunctions = () => {
        if(this.state.ended.length === 0){
            return (
                <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                    <span>Nie posiadasz ??adnych archiwalnych zlecen</span>
                </div>
            )
        }
        return this.state.ended.map(malfunctions => {
            return (
                <div>
                    <div>
                        <Link to={{
                            pathname: '/malfunction/' + malfunctions.id ,
                            state: {
                                id: malfunctions.id
                            }
                        }}>
                            <div className="img-container p-5">

                                <div className="card-footer d-flex justify-content-between">
                                    <h4 className="align-self-center mb-0" style={{
                                        margin: "0px",
                                        fontSize: "1.5em"
                                    }}>
                                        {malfunctions.name}
                                    </h4>
                                    <p className="align-self-center mb-0">
                                        {malfunctions.categories.join(', ')}
                                    </p>
                                    <p className="align-self-center mb-0">
                                        {malfunctions.location}
                                    </p>
                                </div>
                                <div>
                                    <Link to={{
                                        pathname: '/messages/' + malfunctions.creatorId ,
                                        state: {
                                            creatorId: malfunctions.creatorId
                                        }
                                    }}>
                                        <button className={'kontakt'} >
                                            <span>Kontakt</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="py-5">
                <div className="container">
                    <h1>Zg??oszone Awarie</h1>
                    <div style={{marginBottom: "1%",
                        textAlign: "center"}}>
                        <span style={{fontSize: "xx-large"}}>Oczekuj??ce awarie</span>
                    </div>
                    <div className="row">
                        {
                            this.renderPendingMalfunctions()
                        }
                    </div>
                    <div style={{marginBottom: "1%",
                        textAlign: "center"}}>
                        <span style={{fontSize: "xx-large"}}>Awarie w trakcie wykonywania</span>
                    </div>
                    <div className="row">
                        {
                            this.renderInWorkMalfunctions()
                        }
                    </div>
                    <div style={{marginBottom: "1%",
                        textAlign: "center"}}>
                        <span style={{fontSize: "xx-large"}}>Zakonczone awarie</span>
                    </div>
                    <div className="row">
                        {
                            this.renderEndedMalfunctions()
                        }
                    </div>
                </div>
            </div>
        );
    }

}