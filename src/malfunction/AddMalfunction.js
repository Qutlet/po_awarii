import React, {Component} from "react";
import MalfunctionObject from "./MalfunctionObject";
import axios from "axios";
import "../css/App.css"

export default class AddMalfunction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catTmp : [],
            catValueTmp : 0,
            cat: [],
        }
        this.processSubmit = this.processSubmit.bind(this);
        this.inputStyle = this.inputStyle.bind(this);
        this.processCategory = this.processCategory.bind(this);
        this.categoryList = this.categoryList.bind(this);
        this.addCategory = this.addCategory.bind(this)
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_SERVER + '/category',{ headers : {
                'Authorization' : 'Token ' + this.props.userdata.token
            }}).then(r => {
            this.setState({
                catTmp: r.data
            })
        });
    }

    processSubmit = (obj) => {
        obj.preventDefault()
        console.debug("creating malfunction...")
        axios.post(process.env.REACT_APP_SERVER + '/malfunctions/create' ,{
            name: obj.target.name.value,
            description: obj.target.description.value,
            categories: this.state.cat,
            location: obj.target.location.value,
            phoneNumber: obj.target.phone.value,
            email: obj.target.email.value
        },{
            headers : {
                'Authorization' : 'Token ' + this.props.userdata.token
            }
        }).then((resp) => {
            this.props.history.push('/');
            window.location.reload(false);
        }).catch((err) => {
            console.error(err)
        })
    }

    processCategory = (obj) => {
        this.setState({catValueTmp: obj.target.value})
    }

    addCategory = (obj) => {
        obj.preventDefault()
        let cat = this.state.catValueTmp;
        let catArray = this.state.cat;
        if (catArray.includes(cat)){
            return;
        }
        catArray.push(cat)
        this.setState({
            cat: catArray
        })
    }


    categoryList = () => {
        let listTexted = "";
        this.state.cat.forEach(value => listTexted = listTexted + value + ", ");
        return listTexted.slice(0,-2);
    }

    inputStyle = () => {
        return {
            width: "50%",
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
            width: "30%",
            textAlign: "right",
            padding: "0px 20px",
            margin: "8px 0",
            display: "inline-block",
            boxSizing: "border-box"
        }
    }

    buttonStyle = () => {
        return {
            color: "black",
            backgroundColor: "gold",
            display: "inline-block",
            border: "none",
            marginLeft: "1%",
            padding: "10px",
            borderRadius: "12px",
            textAlign: "center"
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1 style={{textAlign: "center"}}>Zgłoś awarię</h1>
                <div style={{borderRadius: "5px", backgroundColor: "#f2f2f2", padding: "20px", margin: "auto"}}>
                    <form onSubmit={this.processSubmit}>

                        <label htmlFor="fname" style={this.labelStyle()}>Nazwa:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="name"
                               placeholder="Podaj nazwę awarii"/>

                        <label htmlFor="fname" style={this.labelStyle()}>Opis:</label>
                        <textarea style={this.inputStyle()} id="fname" name="description"
                               placeholder="Podaj opis awarii"/>

                        <label htmlFor="fname" style={this.labelStyle()}>Miejsce awarii:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="location"
                               placeholder="Podaj miejsce awarii"/>

                        <label htmlFor="fname" style={this.labelStyle()}>Numer telefonu:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="phone"
                               placeholder="Podaj numer telefonu"/>

                        <label htmlFor="fname" style={this.labelStyle()}>E-mail:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="email"
                               placeholder="Podaj e-mail"/>

                        <label htmlFor="fname" style={{
                            width: "81.05%",
                            textAlign: "right",
                            padding: "12px 20px",
                            margin: "8px 0",
                            display: "inline-block",
                            boxSizing: "border-box"
                        }}>
                            <h3>Kategorie awarii</h3>
                            {this.categoryList()}
                        </label>
                        <label htmlFor="fname" style={{
                            width: "88%",
                            textAlign: "right",
                            display: "inline-block",
                            boxSizing: "border-box"
                        }}>
                            Dodaj kategorie swojej awarii
                            <select style={this.inputStyle()} value={this.state.catValueTmp} onChange={this.processCategory}>
                                {this.state.catTmp.map(cat =>
                                    <option value={cat.name} key={cat.id}>{cat.name}</option>
                                )}
                            </select>
                            <button style={this.buttonStyle()} onClick={this.addCategory}>Dodaj</button>
                        </label>


                        <div style={{textAlign: "center"}}>
                            <input type={"submit"} value={"Dodaj zgłoszenie awarii"}
                                   className={"submit-button"}/>
                        </div>


                    </form>
                </div>
            </React.Fragment>
        )
    }
}