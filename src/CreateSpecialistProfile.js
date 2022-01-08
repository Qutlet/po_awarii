import {Component} from "react";
import CategoryChooser from "./Category/CategoryChooser"
import axios from "axios";

export default class CreateSpecialistProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            catTmp : [{id:0 ,name : "Awaria Hydrauliczna"}, {id:1 ,name :"Awaria elektryczna"}],
            catValueTmp : 0,
            cat: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.processCategory = this.processCategory.bind(this)
        this.addCategory = this.addCategory.bind(this)
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
        console.log(obj)
    };


    componentDidMount() {
        axios.get("http://localhost:8080/category",{ headers : {
                'Authorization' : 'Token ' + this.props.userdata.token
            }}).then(r => {
            this.setState({
                cat: r.data
            })
        });
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

    processCategory = (obj) => {
        this.setState({catValueTmp: obj.target.value})
    }

    addCategory = (obj) => {
        obj.preventDefault()
        let cat = this.state.catTmp[this.state.catValueTmp];
        let catArray = this.state.cat;
        if (catArray.includes(cat.name)){
            return;
        }
        catArray.push(cat.name)
        this.setState({
            cat: catArray
        })
    }

    processSubmit = (obj) => {
        obj.preventDefault()
        console.log("processing...")
        console.log(this.props)
        axios.post('http://localhost:8080/malfunctions/create' ,{
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
            console.log(resp)
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Załóż konto specjalisty</h1>
                <div style={{borderRadius: "5px", backgroundColor: "#f2f2f2", padding: "20px", margin: "auto"}}>
                    <form onSubmit={this.processSubmit}>

                        <label htmlFor="fname" style={this.labelStyle()}>Nazwa profilu/firmy:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="customName"
                               placeholder="Podaj nazwe swojej firmy lub nazwij swój profil"/>

                        <label htmlFor="fname" style={this.labelStyle()}>Imię:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="firstname"
                               placeholder="Imię"/>

                        <label htmlFor="fname" style={this.labelStyle()}>Nazwisko:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="lastname"
                               placeholder="Nazwisko"/>

                        <label htmlFor="fname" style={this.labelStyle()}>Teren działania</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="location"
                               placeholder="Podaj lokalizacje swojej pracy"/>

                        <label htmlFor="fname" style={this.labelStyle()}>Telefon:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="phone"
                               placeholder="Numer telefonu"/>

                        <label htmlFor="fname" style={this.labelStyle()}>E-mail:</label>
                        <input type="text" style={this.inputStyle()} id="fname" name="email"
                               placeholder="E-mail"/>

                        <label htmlFor="fname" style={{
                            width: "81.05%",
                            textAlign: "right",
                            padding: "12px 20px",
                            margin: "8px 0",
                            display: "inline-block",
                            boxSizing: "border-box"
                        }}>
                            <h3>Kategorie awarii</h3>
                            {this.state.cat.join(', ')}
                        </label>
                        <label htmlFor="fname" style={{
                            width: "88%",
                            textAlign: "right",
                            display: "inline-block",
                            boxSizing: "border-box"
                        }}>
                            Wybierz swoje specjalizacje
                            <select style={this.inputStyle()} value={this.state.catValueTmp} onChange={this.processCategory}>
                                {this.state.catTmp.map(cat =>
                                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                                )}
                            </select>
                            <button  onClick={this.addCategory}>Dodaj</button>

                            <CategoryChooser show={this.state.show} handleClose={this.hideModal} token={this.props.userdata.token} handleSubmit={this.handleSubmit}>
                                <p>Modal</p>
                            </CategoryChooser>
                            <button type="button" onClick={this.showModal}>
                                Dodaj nową kategorie
                            </button>
                        </label>


                        <div style={{textAlign: "center"}}>
                            <button type={"submit"}
                                   className={"submit-button"}>
                                <span>Załóż konto specjalisty</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}