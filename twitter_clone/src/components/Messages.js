import React, {Component} from 'react';
// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {faCog} from '@fortawesome/free-solid-svg-icons';
// import {faCommentAltPlus} from '@fortawesome/free-solid-svg-icons';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons';
import OneMessage from './OneMessage.js';
import '../styles/Messages.css';


class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            messages: [{message: "FakeMessage2", time: "2020-02-02", sender: true},
                        {message: "FakeMessage2", time: "2020-02-02", sender: false},
                        {message: "FakeMessage2", time: "2020-02-02", sender: true},
                        {message: "FakeMessage2", time: "2020-02-02", sender: false},
                        {message: "FakeMessage2", time: "2020-02-02", sender: true}]
        }
        this.send = this.send.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    send(event){
        this.setState({text: event.target.value});
    }
    handleClick(event){ // this function is supposed to call
        const params = {
            sender: this.props.sender,
            receiver: "fakename",
            message: this.state.text
        };
        if (!params.message) {
            console.log("no message");
            return;
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/saveMessage", options)
            .then(res => res.json())
            .then(res => {
                this.setState({messages: res});
            });
    }

    render() {
        const messages = this.state.messages.map(message => (
            <OneMessage key={message.time} message={message} />
        ));
        return(
            <div className={`messages`}>
                <div className="title">
                    <h2>Messages</h2>
                    <div id="icons">
                        <a href="#"> <FontAwesomeIcon className={`menu-icon`}
                        icon={faCog} size="2x" /></a>
                        <a href="#">
                        <FontAwesomeIcon className={`menu-icon`}
                        icon={faCommentAlt} size="2x" />
                        </a>
                    </div>
                </div>
                <div className="messageArea">
                    {messages}
                </div>
                <div className="sendAMessage">
                    <div className="textArea">
                        <input type="text" onChange={this.send} placeholder="Send something"/>
                    </div>
                    <div id="sendBtn">
                        <button type="button"><FontAwesomeIcon className={`menu-icon`}
                        icon={faPaperPlane} size="1x" onClick={this.handleClick}/></button>

                    </div>
                </div>
            </div>
        );
    };
}

export default Messages;
