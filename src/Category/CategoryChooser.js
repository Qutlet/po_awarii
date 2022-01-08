import './modal.css';
import axios from "axios";
import PhotoObject from "../PhotoObject";
import Category from "./Category";
import {func} from "prop-types";



function add(token) {
    const name = document.getElementsByName("newCaat").value;
    console.log(name)
    // axios.post("http://localhost:8080/category?name=" + name, {
    //     headers: {
    //         'Authorization': 'Token ' + token
    //     }
    // }).then(r  => {
    //     console.log(r)
    // })
}

export default function CategoryChooser({ handleClose, show, children, token, handleSubmit })  {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <div>
                    <h3>Podaj nazwe własnej kategorii</h3>
                    <form onSubmit={add(token)}>
                        <input type={"text"} id="fname" name="newCaat" placeholder="Awaria ..."/>
                        <button type={"submit"} >Dodaj</button>
                    </form>
                </div>
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};