import React, {Component} from "react";
import axios from "axios";

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
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
        })
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
                                            <input type="file" name="image" accept="image/png, image/jpeg"/>
                                            <button>Zapisz zdięcje</button>
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
                                                    <button>Zmień</button>
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
                                                    <button>Zmień</button>
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
                                                    <button>Zmień</button>
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
                                                    <label htmlFor="fname" style={this.labelStyle()}>{this.state.userInfo.phone}</label>
                                                    <button>Zmień</button>
                                                </div>
                                            </div>
                                            <div style={{textAlign: "center"
                                            }}>

                                                    {/*<input type="text" style={this.inputStyle()} id="fname" name="firstName"*/}
                                                    {/*       placeholder="Imie" value={this.state.userInfo.firstName}/>*/}
                                                    <button style={{width: "50%"}}>Zmień hasło</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="col-md-8">*/}
                        {/*    <div className="specCard mb-3" style={{flexDirection: "row"}}>*/}
                        {/*        <div className="specCard-body" style={{*/}
                        {/*            borderStyle: "solid",*/}
                        {/*            borderColor: "white",*/}
                        {/*            borderWidth: "thick",*/}
                        {/*            borderRightColor: "gold",*/}
                        {/*            borderBottomColor: "gold",*/}
                        {/*            minWidth: "25%",*/}
                        {/*            height: "fit-content"*/}
                        {/*        }}>*/}
                        {/*            <div style={{*/}
                        {/*                display : "flex",*/}
                        {/*                flexWrap: "wrap",*/}
                        {/*                marginBottom : "5%"*/}
                        {/*            }}>*/}
                        {/*                <div>*/}
                        {/*                    <h2>{this.state.specialist.customProfileName}</h2>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <div style={{*/}
                        {/*                display : "flex",*/}
                        {/*                flexWrap: "wrap",*/}
                        {/*                marginBottom : "5%"*/}
                        {/*            }}>*/}
                        {/*                <div style={{flex: "0 0 25%",*/}
                        {/*                    maxWidth: "25%"}}>*/}
                        {/*                    <h6 style={{margin : "0px",*/}
                        {/*                        flex: "0 0 75%",*/}
                        {/*                        maxWidth: "75%"}}>*/}
                        {/*                        Numer telefonu*/}
                        {/*                    </h6>*/}
                        {/*                </div>*/}
                        {/*                <div style={{*/}
                        {/*                    color : "grey",*/}
                        {/*                    flex: "0 0 75%",*/}
                        {/*                    maxWidth: "75%"*/}
                        {/*                }}>*/}
                        {/*                    {this.state.specialist.phoneNumber}*/}
                        {/*                </div>*/}

                        {/*            </div>*/}
                        {/*            <div style={{*/}
                        {/*                display : "flex",*/}
                        {/*                flexWrap: "wrap",*/}
                        {/*                marginBottom : "5%"*/}
                        {/*            }}>*/}
                        {/*                <div style={{flex: "0 0 25%",*/}
                        {/*                    maxWidth: "25%"}}>*/}
                        {/*                    <h6 style={{margin : "0px",*/}
                        {/*                        flex: "0 0 75%",*/}
                        {/*                        maxWidth: "75%"}}>*/}
                        {/*                        Adress email*/}
                        {/*                    </h6>*/}
                        {/*                </div>*/}
                        {/*                <div style={{*/}
                        {/*                    color : "grey",*/}
                        {/*                    flex: "0 0 75%",*/}
                        {/*                    maxWidth: "75%"*/}
                        {/*                }}>*/}
                        {/*                    {this.state.specialist.email}*/}
                        {/*                </div>*/}

                        {/*            </div>*/}
                        {/*            <div style={{*/}
                        {/*                display : "flex",*/}
                        {/*                flexWrap: "wrap",*/}
                        {/*                marginBottom : "5%"*/}
                        {/*            }}>*/}
                        {/*                <div style={{flex: "0 0 25%",*/}
                        {/*                    maxWidth: "25%"}}>*/}
                        {/*                    <h6 style={{margin : "0px",*/}
                        {/*                        flex: "0 0 75%",*/}
                        {/*                        maxWidth: "75%"}}>*/}
                        {/*                        Specjalizacje:*/}
                        {/*                    </h6>*/}
                        {/*                </div>*/}
                        {/*                <div style={{*/}
                        {/*                    color : "grey",*/}
                        {/*                    flex: "0 0 75%",*/}
                        {/*                    maxWidth: "75%"*/}
                        {/*                }}>{this.state.specialist.categories.join(", ")}</div>*/}

                        {/*            </div>*/}
                        {/*            <div style={{*/}
                        {/*                display : "flex",*/}
                        {/*                flexWrap: "wrap",*/}
                        {/*                marginBottom : "5%"*/}
                        {/*            }}>*/}
                        {/*                <div style={{flex: "0 0 25%",*/}
                        {/*                    maxWidth: "25%"}}>*/}
                        {/*                    <h6 style={{margin : "0px",*/}
                        {/*                        flex: "0 0 75%",*/}
                        {/*                        maxWidth: "75%"}}>*/}
                        {/*                        Opis:*/}
                        {/*                    </h6>*/}
                        {/*                </div>*/}
                        {/*                <div style={{*/}
                        {/*                    color : "grey",*/}
                        {/*                    flex: "0 0 75%",*/}
                        {/*                    maxWidth: "75%"*/}
                        {/*                }}>*/}
                        {/*                    {this.state.specialist.description}*/}
                        {/*                </div>*/}

                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <button>kontkt</button>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="specCard-body" style={{*/}
                        {/*            borderWidth: "thick",*/}
                        {/*            borderStyle: "solid",*/}
                        {/*            borderColor: "white",*/}
                        {/*            borderLeftColor: "gold"}}>*/}
                        {/*            <div style={{*/}
                        {/*                display : "flex",*/}
                        {/*                flexWrap: "wrap",*/}
                        {/*                flexDirection: "column"*/}
                        {/*            }}>*/}
                        {/*                <div style={{flex: "0 0 25%",*/}
                        {/*                    maxWidth: "25%"}}>*/}
                        {/*                    <h6 style={{margin : "0px",*/}
                        {/*                        flex: "0 0 75%",*/}
                        {/*                        maxWidth: "75%"}}>*/}
                        {/*                        Galeria prac*/}
                        {/*                    </h6>*/}
                        {/*                </div>*/}
                        {/*                <div style={{display : "flex",*/}
                        {/*                    flexWrap: "wrap",*/}
                        {/*                    flexDirection: "row"}}>*/}

                        {/*                    {this.renderGallery()}*/}
                        {/*                </div>*/}

                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }
}