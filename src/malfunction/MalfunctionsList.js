import React, {Component} from "react";
import MalfunctionObject from "./MalfunctionObject";
import axios from "axios";

export default class MalfunctionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            malfunctions: []
        };
        this.renderMalfunctions = this.renderMalfunctions.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    renderMalfunctions = () => {
        if(this.state.malfunctions.length === 0){
            return
        }
        return this.state.malfunctions.map(malfunctions => {
            return (
                <MalfunctionObject key={malfunctions.id} malfunctionObject={malfunctions}/>
            )
        })
    }

    componentDidMount = () => {
        axios.get('https://po-awarii.herokuapp.com/malfunctions/all', {
             headers : {
                 'Authorization' : 'Token ' + this.props.userdata.token
             }
        })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    malfunctions : response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <h1>Zgłoszone Awarie</h1>
                        <div className="row">
                            {
                                this.renderMalfunctions()
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}