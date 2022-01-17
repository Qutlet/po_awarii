import "../css/modal.css"
import "../css/LoginForm.css"
import React from "react";

export default function EditPassword({ handleClose, show, children, handleSubmit })  {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main" style={{width: "50%"}} >
                {children}
                <div style={{padding: "12px"}}>
                    <h3>Podaj nowe hasło</h3>
                    <div >
                        <input type="password" name="editName" style={{width: "100%"}} className={'login-input'} placeholder="Your Old password" id="oldPass2" autoComplete="off"/>
                    </div>
                    <div>
                        <input type="password" name="editLastName" style={{width: "100%"}} className={'login-input'} placeholder="Your new Password" id="newPass" autoComplete="off"/>
                    </div>
                    <div >
                        <input type="password" name="editMail" style={{width: "100%"}} className={'login-input'} placeholder="Your new Password" id="newPass2" autoComplete="off"/>
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
                        Zmień
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