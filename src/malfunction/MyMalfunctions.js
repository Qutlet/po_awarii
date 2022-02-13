import {Component} from "react";
import axios from "axios";
import MalfunctionObject from "./MalfunctionObject";
import {Link} from "react-router-dom";
import "../css/Details.css"
import MyMalfunctionObject from "./MyMalfunctionObject";

export default class MyMalfunctions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            malfunctions: [],
            pending: [],
            inWork: [],
            ended: []
        }
    }

    renderPendingMalfunctions = () => {
        if(this.state.pending.length === 0){
            return (
                <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                    <span>Nie posiadasz żadnych oczekujacych zgłoszeń</span>
                    <Link to={{
                        pathname: '/malfunctions/add'}}>
                        <button>Dodaj zgłoszenie</button>
                    </Link>
                </div>
            )
        }
        return this.state.pending.map(malfunctions => {
                return (
                    <MyMalfunctionObject key={malfunctions.id} myMalfunctionObject={malfunctions} token={this.props.userdata.token}/>
                )
        })
    }

    renderInWorkMalfunctions = () => {
        if(this.state.inWork.length === 0){
            return (
                <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                    <span>Nie posiadasz żadnych aktywnych zgłoszeń</span>
                </div>
            )
        }
        return this.state.inWork.map(malfunctions => {
            if (malfunctions.status === "IN_WORK") {
                return (
                    <MyMalfunctionObject key={malfunctions.id} myMalfunctionObject={malfunctions}/>
                )
            }
        })
    }

    renderEndedMalfunctions = () => {
        if(this.state.ended.length === 0){
            return (
                <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                    <span>Nie posiadasz żadnych archiwalnych zgłoszeń</span>
                </div>
            )
        }
        return this.state.ended.map(malfunctions => {
            if (malfunctions.status === "ENDED") {
                return (
                    <MyMalfunctionObject key={malfunctions.id} myMalfunctionObject={malfunctions}/>
                )
            }
        })
    }

    componentDidMount() {
        const userId = this.props.userdata.userId;
        let pending = [];
        let inWork = [];
        let ended = [];
        axios.get(process.env.REACT_APP_SERVER + '/malfunctions/user/' + userId, {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then(r => {
            console.log(r)
            this.setState({
                malfunctions: r.data
            })
            for (let i = 0; i < r.data.length; i++) {
                if(r.data[i].status === "PENDING" ) {
                    pending.push(r.data[i])
                }
                if(r.data[i].status === "IN_WORK" ) {
                    inWork.push(r.data[i])
                }
                if(r.data[i].status === "ENDED" ) {
                    ended.push(r.data[i])
                }
            }
            this.setState({
                pending: pending,
                inWork: inWork,
                ended: ended
            })
        })
    }

    render() {
        if (this.state.malfunctions == null) {
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
            <div className="py-5">
                <div className="container">
                    <h1>Zgłoszone Awarie</h1>
                    <div style={{marginBottom: "1%",
                        textAlign: "center"}}>
                        <span style={{fontSize: "xx-large"}}>Oczekujące awarie</span>
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