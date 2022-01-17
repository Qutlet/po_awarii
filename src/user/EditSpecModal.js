import "../css/modal.css"
import "../css/LoginForm.css"
import React from "react";

export default function EditSpecModal({ handleClose, show, children, handleSubmit })  {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main" style={{width: "50%"}} >
                {children}
                <div style={{padding: "12px"}}>
                    <h3>Podaj nowe dane</h3>
                    <div >
                        <input type="text" name="editName" style={{width: "100%"}} className={'login-input'} placeholder="Imię" id="editCustomName2" autoComplete="off"/>
                    </div>
                    <div>
                        <input type="text" name="editPhone" style={{width: "100%"}} className={'login-input'} placeholder="Telefon" id="editPhoneSpec2" autoComplete="off"/>
                    </div>
                    <div >
                        <input type="email" name="editMail" style={{width: "100%"}} className={'login-input'} placeholder="Adres mailowy" id="editMailSpec2" autoComplete="off"/>
                    </div>
                    <div>
                        <input type="text" name="editPhone" style={{width: "100%"}} className={'login-input'} placeholder="Opis" id="editDesc2" autoComplete="off"/>
                    </div>
                </div>
                <div style={{padding: "12px",
                    display: "dlex",
                    justifyContent: "center"
                }}>
                    <button type="button" onClick={handleSubmit} style={{
                        color: "black",
                        backgroundColor: "gold",
                        display: "inline-block",
                        border: "none",
                        marginLeft: "1%",
                        padding: "10px",
                        borderRadius: "12px",
                        textAlign: "center"
                    }}>
                        Dodaj
                    </button>
                    <button type="button" onClick={handleClose} style={{
                        color: "black",
                        backgroundColor: "gold",
                        display: "inline-block",
                        border: "none",
                        marginLeft: "1%",
                        padding: "10px",
                        borderRadius: "12px",
                        textAlign: "center"
                    }}>
                        Anuluj
                    </button>
                </div>
            </section>
        </div>
    )
}