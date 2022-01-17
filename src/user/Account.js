import React, {Component} from "react";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import EditPassword from "./EditPassword";
import PhotoObject from "../util/PhotoObject";
import EditSpecModal from "./EditSpecModal";

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModalSecond = this.showModalSecond.bind(this);
        this.hideModalSecond = this.hideModalSecond.bind(this);
        this.renderGallery = this.renderGallery.bind(this);
        this.showModalSpec = this.showModalSpec.bind(this);
        this.hideModalSpec = this.hideModalSpec.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    showModalSecond = () => {
        this.setState({ showSecond: true });
    };

    hideModalSecond = () => {
        this.setState({ showSecond: false });
    };

    showModalSpec = () => {
        this.setState({ showSpec: true });
    };

    hideModalSpec = () => {
        this.setState({ showSpec: false });
    };

    renderGallery = () => {
        if(this.state.specialist.photos.length === 0){
            return (
                <div>Ten specjalista nie dodał jeszcze żadnych zdjęć</div>
            )
        }
        return this.state.specialist.photos.map(photo => {
            let url = "http://localhost:8080/file/download/" + photo;
            return (
                <div className="gallery">
                    <img src={url} width="100" height="100" alt={"photo"}/>
                </div>
            )
        })
    }

    componentDidMount() {
        axios.get("http://localhost:8080/users/get/me", {
            headers: {
                'Authorization': 'Token ' + this.props.userdata.token
            }
        }).then(r => {
            console.log(r.data)
            this.setState({
                userInfo: r.data
            })

            axios.get("http://localhost:8080/specProfile/user/" + this.state.userInfo.id, {
                headers: {
                    'Authorization': 'Token ' + this.props.userdata.token
                }
            }).then(res => {
                console.log(res.data)
                this.setState({
                    specialist: res.data
                })
            })

        }).catch(() => {
            return
            }
        )
     }

    inputStyle = () => {
        return {
            padding: "12px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
            marginLeft: "10%"
        }
    }

    labelStyle = () => {
        return {
            width: "100%",
            textAlign: "right",
            padding: "0px 20px",
            margin: "18px 0",
            display: "inline-block",
            boxSizing: "border-box"
        }
    }

    handleSubmit = (obj) => {
        const userId = this.state.userInfo.id;
        obj.preventDefault()
        const newName = document.getElementById('editName2').value;
        if (newName === "") {
            console.log(newName)
            alert("Imię nie może być puste")
            return;
        }
        const newLastName = document.getElementById('editLastName2').value;
        if (newLastName === "") {
            alert("Nazwisko nie może być puste")
            return;
        }
        const newEmail = document.getElementById('editMail2').value;
        if (newEmail === "") {
            alert("Adres mailowy nie może być pusty")
            return;
        }
        const newPhone = document.getElementById('editPhone2').value;
        axios.put("http://localhost:8080/users?userID=" + userId, {
                firstName: newName,
                lastName: newLastName,
                email: newEmail,
                phoneNumber: newPhone
            },
            {
                headers: {
                    'Authorization': 'Token ' + this.props.userdata.token
                }
            })
            .then(r => {})
            .catch(e => {})
        this.setState({ show: false });
        document.getElementById('editName2').value = "";
        document.getElementById('editLastName2').value = "";
        document.getElementById('editMail2').value = "";
        document.getElementById('editPhone2').value = "";
        window.location.reload(false);
    }

    handleSubmitSecond = (obj) => {
        const userId = this.state.userInfo.id;
        obj.preventDefault();
        const oldPass = document.getElementById("oldPass2").value;

        const newPass = document.getElementById("newPass").value;

        const newPass2 = document.getElementById("newPass2").value;
        if (newPass === "") {
            alert("Haslo za krotkie")
            return;
        }
        if (newPass !== newPass2) {
            alert("Hasla nie są takie same")
            return;
        }
        axios.put("http://localhost:8080?users/password?userID=" + userId,
            {
                oldPassword: oldPass,
                password: newPass,
                matchingPassword: newPass2
            },
            {
                headers: {
                    'Authorization': 'Token ' + this.props.userdata.token
                }
            })
            .then(r => {
                console.log(r)
            })
            .catch(e => {
                console.log(e)
            })
        this.setState({ showSecond: false });
        document.getElementById('oldPass2').value = "";
        document.getElementById('newPass').value = "";
        document.getElementById('newPass2').value = "";
        window.location.reload(false);
    }

    handleSubmitSpec = (obj) => {
        const specId = this.state.specialist.id;
        obj.preventDefault()
        const newName = document.getElementById('editCustomName2').value;
        if (newName === "") {
            console.log(newName)
            alert("Nazwa nie może być puste")
            return;
        }
        const newPhone = document.getElementById('editPhoneSpec2').value;
        if (newPhone === "") {
            alert("Telefon nie może być puste")
            return;
        }
        const newEmail = document.getElementById('editMailSpec2').value;
        if (newEmail === "") {
            alert("Adres mailowy nie może być pusty")
            return;
        }
        const newDesc = document.getElementById('editDesc2').value;
        if (newDesc === "") {
            alert("Opis nie może być pusty")
            return;
        }
        axios.put("http://localhost:8080/specProfile/" + specId + "/edit", {
                customProfileName: newName,
                description: newDesc,
                email: newEmail,
                phoneNumber: newPhone
            },
            {
                headers: {
                    'Authorization': 'Token ' + this.props.userdata.token
                }
            })
            .then(r => {})
            .catch(e => {})
        this.setState({ showSpec: false });
        document.getElementById('editCustomName2').value = "";
        document.getElementById('editPhoneSpec2').value = "";
        document.getElementById('editMailSpec2').value = "";
        document.getElementById('editDesc2').value = "";
        window.location.reload(false);
    }

    sendSpecPhoto = (event) => {
        const senderID = this.state.userInfo.id;
        for (let file of event.target.files) {
            var bodyFormData = new FormData()
            bodyFormData.append('senderId', senderID);
            bodyFormData.append('file', file);
            bodyFormData.append("purpose", "SPECIALIST_WORK_PHOTO")
            axios({
                method: "post",
                url: "http://localhost:8080/file/upload",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                })
        }
    }

    sendPhoto = (event) => {
        const senderID = this.state.userInfo.id;
        for (let file of event.target.files) {
            var bodyFormData = new FormData()
            bodyFormData.append('senderId', senderID);
            bodyFormData.append('file', file);
            bodyFormData.append("purpose", "USER_PROFILE_PHOTO")
            axios({
                method: "post",
                url: "http://localhost:8080/file/upload",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (response) {
                    console.log(response);
                })
        }
    }

    renderSpecProfile = () => {
        if (this.state.specialist === undefined){
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
        if (this.state.specialist.message) {
            return (
                <div>
                    <span>Nie posiadasz konta specjalisty</span>
                </div>
            )
        }
        return (
            <div className="col-md-8">
                <div className="specCard mb-3" style={{flexDirection: "row"}}>
                    <div className="specCard-body" style={{
                        borderStyle: "solid",
                        borderColor: "white",
                        borderWidth: "thick",
                        borderRightColor: "gold",
                        borderBottomColor: "gold",
                        minWidth: "25%",
                        height: "fit-content"
                    }}>
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
                            <EditSpecModal show={this.state.showSpec} handleClose={this.hideModalSpec} handleSubmit={this.handleSubmitSpec}>
                            </EditSpecModal>
                            <button onClick={this.showModalSpec}>Edytuj</button>
                        </div>
                    </div>
                    <div className="specCard-body" style={{
                        borderWidth: "thick",
                        borderStyle: "solid",
                        borderColor: "white",
                        borderLeftColor: "gold"}}>
                        <div style={{
                            display : "flex",
                            flexWrap: "wrap",
                            flexDirection: "column"
                        }}>
                            <div style={{flex: "0 0 25%",
                                flexDirection: "row",
                                display: "flex",
                                maxWidth: "25%"}}>
                                <h6 style={{margin : "0px",
                                    flex: "0 0 75%",
                                    maxWidth: "75%"}}>
                                    Galeria prac
                                </h6>
                                <div>
                                    <input type="file" name="image" multiple accept="image/png, image/jpeg" onInput={this.sendSpecPhoto}/>
                                </div>
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
        )
    }

    render() {
        if (this.state.userInfo == null) {
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
        if(this.state.userInfo.photo) {
            url = "http://localhost:8080/file/download/" + this.state.userInfo.photo;
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
                                        <div style={{display: "flex",
                                            flexDirection: "column",
                                            width: "20%"}}>
                                            <img src={url} alt="alternatetext"
                                                 style={{
                                                     borderColor: "gold",
                                                     borderWidth: "5px",
                                                     borderStyle: "solid"}}
                                            />
                                            <label htmlFor="fname" >Dodaj zdiecie profilowe</label>
                                            <input type="file" name="image" accept="image/png, image/jpeg" onInput={this.sendPhoto}/>
                                        </div>

                                        {/*<div style={{*/}
                                        {/*    textAlign: "center",*/}
                                        {/*    width: "100%"*/}
                                        {/*}}>*/}
                                        {/*    <h1>{this.state.userInfo.firstName + " " + this.state.userInfo.lastName}</h1>*/}
                                        {/*</div>*/}
                                        <div style={{
                                            display : "flex",
                                            flexWrap: "wrap",
                                            textAlign: "center",
                                            marginBottom : "5%",
                                            paddingLeft: "10%",
                                            flexDirection: "column"
                                        }}>

                                            <div style={{display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>

                                                <div style={{margin : "10px"}}>
                                                    <h2 style={{margin : "0px"}}>
                                                        Imię:
                                                    </h2>
                                                </div>
                                                <div style={{
                                                    color : "grey",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}>
                                                    {/*<input type="text" style={this.inputStyle()} id="fname" name="firstName"*/}
                                                    {/*       placeholder="Imie" value={this.state.userInfo.firstName}/>*/}
                                                    <label htmlFor="fname" style={this.labelStyle()}>{this.state.userInfo.firstName}</label>
                                                    {/*<button>Zmień</button>*/}
                                                </div>
                                            </div>

                                            <div style={{display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <div style={{margin : "10px"}}>
                                                    <h2 style={{margin : "0px"}}>
                                                        Nazwisko:
                                                    </h2>
                                                </div>
                                                <div style={{
                                                    color : "grey",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}>
                                                    {/*<input type="text" style={this.inputStyle()} id="fname" name="firstName"*/}
                                                    {/*       placeholder="Imie" value={this.state.userInfo.firstName}/>*/}
                                                    <label htmlFor="fname" style={this.labelStyle()}>{this.state.userInfo.lastName}</label>
                                                    {/*<button>Zmień</button>*/}
                                                </div>
                                            </div>
                                            <div style={{display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <div style={{margin : "10px"}}>
                                                    <h2 style={{margin : "0px"}}>
                                                        Adres e-mail:
                                                    </h2>
                                                </div>
                                                <div style={{
                                                    color : "grey",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}>
                                                    {/*<input type="text" style={this.inputStyle()} id="fname" name="firstName"*/}
                                                    {/*       placeholder="Imie" value={this.state.userInfo.firstName}/>*/}
                                                    <label htmlFor="fname" style={this.labelStyle()}>{this.state.userInfo.email}</label>
                                                    {/*<button>Zmień</button>*/}
                                                </div>
                                            </div>
                                            <div style={{display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <div style={{margin : "10px"}}>
                                                    <h2 style={{margin : "0px"}}>
                                                        Telefon:
                                                    </h2>
                                                </div>
                                                <div style={{
                                                    color : "grey",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}>
                                                    {/*<input type="text" style={this.inputStyle()} id="fname" name="firstName"*/}
                                                    {/*       placeholder="Imie" value={this.state.userInfo.firstName}/>*/}
                                                    <label htmlFor="fname" style={this.labelStyle()}>{this.state.userInfo.phoneNumber}</label>
                                                    {/*<button>Zmień</button>*/}
                                                </div>
                                            </div>
                                            <div style={{textAlign: "center"
                                            }}>

                                                    {/*<input type="text" style={this.inputStyle()} id="fname" name="firstName"*/}
                                                    {/*       placeholder="Imie" value={this.state.userInfo.firstName}/>*/}
                                                <EditPassword show={this.state.showSecond} handleClose={this.hideModalSecond} handleSubmit={this.handleSubmitSecond} />
                                                <button style={{width: "50%"}} onClick={this.showModalSecond}>Zmień hasło</button>
                                                <EditUserModal show={this.state.show} handleClose={this.hideModal} handleSubmit={this.handleSubmit}>
                                                </EditUserModal>
                                                <button style={{width: "50%"}} onClick={this.showModal}>Edytuj profil</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.renderSpecProfile()}
                    </div>
                </div>
            </div>
        )
    }
}