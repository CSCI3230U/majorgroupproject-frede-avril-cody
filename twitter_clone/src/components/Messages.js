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
            messages: [],
            receiver: '',
            interval: null,
            userList: [],
            id: 0
        }
        this.send = this.send.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.displayMessages = this.displayMessages.bind(this);
        this.handleReceiverInput = this.handleReceiverInput.bind(this);
    }

    send(event){
        this.setState({text: event.target.value});
    }

    displayMessages() {
        const params = {
            sender: this.props.sender,
            receiver: this.state.receiver
        };

        if (!params.receiver) {
            console.log("no receiver");
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/getMessages", options)
            .then(res => res.json())
            .then(res => {
                this.setState({id: res.id, messages: res.messages});
            });
    }

    componentDidMount() {
        this.displayMessages();
        const interval = setInterval(this.displayMessages, 5000);
        this.setState({interval: interval});
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    sendMessage() {
        const params = {
            sender: this.props.sender,
            receiver: this.state.receiver,
            message: this.state.text
        };

        this.setState({text: ''});
        if (!params.message || !params.receiver) {
            console.log("no receiver");
            return;
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/saveMessage", options)
            .then(res => res.json())
            .then(res => {
                this.setState({id: res.id, messages: res.messages});
                console.log(res);
            });
    }
    handleKeyPress(event) {
        if (event.code === "Enter") {
            this.sendMessage();
        }
    }

    handleClick(event){
        this.sendMessage();
    }

    handleReceiverInput(event) {
        console.log(event.target)
        const input = event.target.value;
        this.setState({receiver: input}, this.displayMessages);
        if (input.length > 0) {
            this.searchUsers(input);
        } else {
            this.setState({userList: []});
        }
    }

    searchUsers(name) {
        const params = {
            username: name
        };
        if (!params.username) {
            return;
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/searchUsers", options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({userList: res});
            });
    }

    render() {
        const messages = React.Children.toArray(this.state.messages.map(message => (
            <OneMessage message={message} user={this.state.id} />
        )));
        return(
            <div className={`messages`}>
                <div className="messages-title">
                    <h2 className={`messages-title-text`}>Messages</h2>
                    <div id="icons">
                        <input type="search" name="receiver" placeholder="Recipient"
                        className="messages-receiver-input" onBlur={this.handleBlur}
                        onFocus={this.handleFocus} onChange={this.handleReceiverInput}
                        value={this.state.receiver} autoComplete="off" />
                        <a href="#"> <FontAwesomeIcon className={`message-icon`}
                        icon={faCog} size="2x" /></a>
                        <a href="#">
                        <FontAwesomeIcon className={`message-icon`}
                        icon={faCommentAlt} size="2x" />
                        </a>
                    </div>
                </div>
                <div className="messageArea">
                    {messages}
                </div>
                <div className="sendAMessage">
                    <div className="textArea">
                        <input type="text" onChange={this.send}
                        value={this.state.text} onKeyPress={this.handleKeyPress}
                        placeholder="Send something"/>
                    </div>
                    <div id="sendBtn">
                        <button type="button" className={`message-send-button`}><FontAwesomeIcon className={`message-icon`}
                        icon={faPaperPlane} size="1x" onClick={this.handleClick}/></button>

                    </div>
                </div>
            </div>
        );
    };
}

export default Messages;
