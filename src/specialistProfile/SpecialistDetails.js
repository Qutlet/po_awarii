import React, {Component} from "react";
import axios from "axios";
import "../css/Details.css"
import UserStorage from "../util/UserStorage";
import PhotoObject from "../util/PhotoObject";
import {Link} from "react-router-dom";

export default class SpecialistDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id:  this.props.match.params.id,
            specialist: null
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.renderGallery = this.renderGallery.bind(this)
    }

    componentDidMount = () => {
        const id = this.state.id;
        axios.get('https://po-awarii.herokuapp.com/specProfile/' + id + '/profile', {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then(r => {
            this.setState({
                specialist: r.data
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

    renderGallery = () => {
        if(this.state.specialist.photos.length === 0){
            return (
                <div>Ten specjalista nie dodał jeszcze żadnych zdjęć</div>
            )
        }
        return this.state.specialist.photos.map(photo => {
            let url = "https://po-awarii.herokuapp.com/file/download/" + photo;
            return (
                <div className="gallery">
                    <img src={url} width="100" height="100" alt={"photo"}/>
                </div>
            )
        })
    }


    render() {
        if (this.state.specialist == null) {
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
        let url;
        if(this.state.specialist.userPhoto) {
            url = "https://po-awarii.herokuapp.com/file/download/" + this.state.specialist.userPhoto;
        } else {
            url = "../default_profile.png"
        }
        return (
            <div className={"container"} style={{
                display : "flex",
                justifyContent: "center",
            }}>
                <div className={"main-body"}>
                    <div className={"specCard-sm"}>
                        <div className={"col-md-4 mb-3"}>
                            <div className="specCard">
                                <div className="specCard-body">
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        <img className={"profile_photo_spec"} src={url} alt="alternatetext"
                                             style={{
                                                 borderColor: "gold",
                                                 width: "10%",
                                                 borderWidth: "5px",
                                                 borderStyle: "solid"}}
                                        />
                                        <div style={{
                                            textAlign: "center",
                                            width: "100%"
                                        }}>
                                            <h1>{this.state.specialist.firstName + " " + this.state.specialist.lastName}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="specCard mb-3 account-v2">
                                <div className="specCard-body specCard-body-v2">
                                    <div style={{
                                        display : "flex",
                                        flexWrap: "wrap",
                                        marginBottom : "5%"
                                    }}>
                                        <div>
                                            <h2>{this.state.specialist.customProfileName}</h2>
                                        </div>
                                    </div>
                                    <div style={{
                                        display : "flex",
                                        flexWrap: "wrap",
                                        marginBottom : "5%"
                                    }}>
                                        <div style={{flex: "0 0 25%",
                                            maxWidth: "25%"}}>
                                            <h6 style={{margin : "0px",
                                                flex: "0 0 75%",
                                                maxWidth: "75%"}}>
                                                Numer telefonu
                                            </h6>
                                        </div>
                                        <div style={{
                                            color : "grey",
                                            flex: "0 0 75%",
                                            maxWidth: "75%"
                                        }}>
                                            {this.state.specialist.phoneNumber}
                                        </div>

                                    </div>
                                    <div style={{
                                        display : "flex",
                                        flexWrap: "wrap",
                                        marginBottom : "5%"
                                    }}>
                                        <div style={{flex: "0 0 25%",
                                            maxWidth: "25%"}}>
                                            <h6 style={{margin : "0px",
                                                flex: "0 0 75%",
                                                maxWidth: "75%"}}>
                                                Adress email
                                            </h6>
                                        </div>
                                        <div style={{
                                            color : "grey",
                                            flex: "0 0 75%",
                                            maxWidth: "75%"
                                        }}>
                                            {this.state.specialist.email}
                                        </div>

                                    </div>
                                    <div style={{
                                        display : "flex",
                                        flexWrap: "wrap",
                                        marginBottom : "5%"
                                    }}>
                                        <div style={{flex: "0 0 25%",
                                            maxWidth: "25%"}}>
                                            <h6 style={{margin : "0px",
                                                flex: "0 0 75%",
                                                maxWidth: "75%"}}>
                                                Specjalizacje:
                                            </h6>
                                        </div>
                                        <div style={{
                                            color : "grey",
                                            flex: "0 0 75%",
                                            maxWidth: "75%"
                                        }}>{this.state.specialist.categories.join(", ")}</div>

                                    </div>
                                    <div style={{
                                        display : "flex",
                                        flexWrap: "wrap",
                                        marginBottom : "5%"
                                    }}>
                                        <div style={{flex: "0 0 25%",
                                            maxWidth: "25%"}}>
                                            <h6 style={{margin : "0px",
                                                flex: "0 0 75%",
                                                maxWidth: "75%"}}>
                                                Opis:
                                            </h6>
                                        </div>
                                        <div style={{
                                            color : "grey",
                                            flex: "0 0 75%",
                                            maxWidth: "75%"
                                        }}>
                                            {this.state.specialist.description}
                                        </div>

                                    </div>
                                    <div>
                                        <Link to={{
                                            pathname: '/messages/' + this.state.specialist.userId ,
                                            state: {
                                                creatorId: this.state.specialist.userId
                                            }
                                        }}>
                                            <button className={'kontakt helpKontakt'}>
                                                <span>Kontakt</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="specCard-body specCard-body-v3">
                                    <div style={{
                                        display : "flex",
                                        flexWrap: "wrap",
                                        flexDirection: "column"
                                    }}>
                                        <div style={{flex: "0 0 25%",
                                            maxWidth: "25%"}}>
                                            <h6 style={{margin : "0px",
                                                flex: "0 0 75%",
                                                maxWidth: "75%"}}>
                                                Galeria prac
                                            </h6>
                                        </div>
                                        <div style={{display : "flex",
                                            flexWrap: "wrap",
                                            flexDirection: "row"}}>

                                            {this.renderGallery()}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}