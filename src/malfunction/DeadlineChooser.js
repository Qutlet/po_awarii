import '../css/modal.css'

export default function DeadlineChooser({ handleClose, show, children, token, handleSubmit, data}) {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className={"modal-main"}>
                {children}
                <div className={"upperCard"}>
                    {data.map(datas => {
                        return (
                            <div className={datas.usable ? "usableCard" : "nonUsableCard"}>
                                <div>
                                    {datas.usable ? <div className={"innerCard"}>
                                        {datas.date.substring(0,10)}
                                        {datas.free ? <button id={datas.id} onClick={handleSubmit}>Wybierz, Uwarzaj wybór jest permanentny</button> : <span>Zajęte, skontaktuj się ze specjalista w razie pytań</span>}
                                    </div> : <span> Nie aktywne, ten specjalista nie pracuje w ten dzień</span>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )

}