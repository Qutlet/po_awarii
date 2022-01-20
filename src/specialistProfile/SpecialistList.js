import React, {Component} from "react";
import MalfunctionObject from "../malfunction/MalfunctionObject";
import axios from "axios";
import SpecilistProfileObject from "./SpecilistProfileObject";

export default class SpecialistList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialistProfiles: []
        };
        this.renderSpecialists = this.renderSpecialists.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    renderSpecialists = () => {
        if (this.state.specialistProfiles.length === 0) {
            return
        }
        return this.state.specialistProfiles.map(profiles => {
            return (
                <SpecilistProfileObject key={profiles.id} specialistProfileObject={profiles}/>
            )
        })
    }

    componentDidMount = () => {
       // axios.get('https://po-awarii.herokuapp.com/specProfile/cat/all', {
        axios.get('https://po-awarii.herokuapp.com/test/specProfile', {   headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    specialistProfiles: response.data
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
                        <h1>Specialiści</h1>
                        <div className="row">
                            {
                                this.renderSpecialists()
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}