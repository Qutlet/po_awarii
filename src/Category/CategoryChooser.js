import './modal.css';

export default function CategoryChooser({ handleClose, show, children, token, handleSubmit })  {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <div style={{padding: "12px"}}>
                    <h3>Podaj nazwe własnej kategorii</h3>
                    <input type={"text"} id="newCaat" name="newCaat" style={{
                        width: "50%",
                        padding: "12px 20px",
                        margin: "8px 0",
                        display: "inline-block",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                        marginLeft: "25%"
                    }} placeholder="Awaria ..."/>
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
                </div>
            </section>
        </div>
    );
};