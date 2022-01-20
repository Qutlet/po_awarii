import {Component} from "react";
import SockJsClient from 'react-stomp';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }

    sendMessage = (msg) => {
        this.clientRef.sendMessage('/topics/all', msg);
    }

    render() {
        return (
            <div>

            </div>
        );
    }


}