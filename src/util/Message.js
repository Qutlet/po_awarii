import {Component} from "react";
import SockJsClient from 'react-stomp';
import axios from "axios";
import "../css/messages.css"

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
        this.refreshMessages = this.refreshMessages.bind(this)
    }

    componentDidMount() {
        console.log(this.state)
        this.refreshMessages();
        setInterval(() => {
            this.refreshMessages()
        }, 15000);
    }

    refreshMessages = () => {
        const senderId = this.props.userdata.userId;
        const recipientId = this.props.match.params.recipientId
        axios.get("https://po-awarii.herokuapp.com/messages?sender=" + senderId + "&recipient=" + recipientId, { headers : {
                'Authorization' : 'Token ' + this.props.userdata.token
            }}).then(r => {
            this.setState({
                messages: r.data
            })
        });
    }

    sendMessage = (obj) => {
        console.log(obj.target.content.value)
        const senderId = this.props.userdata.userId;
        const recipientId = this.props.match.params.recipientId
        axios.post("https://po-awarii.herokuapp.com/messages?sender=" + senderId + "&recipient=" + recipientId, {
            message: obj.target.content.value
        },{ headers : {
                'Authorization' : 'Token ' + this.props.userdata.token
            }}).then(() => {
                this.refreshMessages()
        });
    }

    renderMessages = () => {
        return this.state.messages.map(message => {
            if (message.sender === this.props.userdata.userId) {
                return (
                    <div style={{textAlign: "right", display: "flex", flexDirection: "column"}}>
                        <span style={{fontSize: "0.5em"}}>{message.creationTime}</span>
                        <span style={{fontSize: "1em"}}>{message.content}</span>
                    </div>
                )
            } else {
                return (
                    <div style={{textAlign: "left", display: "flex", flexDirection: "column"}}>
                        <span style={{fontSize: "0.5em"}}>{message.creationTime}</span>
                        <span style={{fontSize: "1em"}}>{message.content}</span>
                    </div>
                )
            }
        })
    }


    render() {
        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <h1>Wiadomosci</h1>
                </div>
                <div className={"messages-list"}>
                    {this.renderMessages()}
                </div>
                <div style={{textAlign: "center"}}>
                    <form onSubmit={this.sendMessage}>
                        <input type={"text"} name={"content"}/>
                        <input type={"submit"} />
                    </form>

                </div>
            </div>
        );
    }


}