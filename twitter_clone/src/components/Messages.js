import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons';
import OneMessage from './OneMessage.js';
import '../styles/Messages.css';
import $ from "jquery";

// the messaging system
class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',       // currently entered text
            messages: [],   // the messages that are received from server
            receiver: '',   // the person we are communicating with
            interval: null, // stores the setInterval
            userList: [],   // pretty sure not implemented, too risky to delete though
            id: 0,          // our rowid
            followed: []    // a list of users we follow
        }
        this.send = this.send.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.displayMessages = this.displayMessages.bind(this);
        this.handleReceiverInput = this.handleReceiverInput.bind(this);
        this.getFollowed = this.getFollowed.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.setReciever = this.setReciever.bind(this);
    }

    // send a message
    send(event){
        this.setState({text: event.target.value});
    }

    // retrieve the messages between us and the receiver
    displayMessages() {
        const params = {
            sender: this.props.sender,
            receiver: this.state.receiver
        };

        if (!params.receiver) {
            return;
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

    // set up
    componentDidMount() {
        this.getFollowed();
        this.displayMessages();
        /* don't know sockets for browsers yet, workaround so we can see
        incoming messages within 5s */
        const interval = setInterval(this.displayMessages, 5000);
        this.setState({interval: interval});
    }

    // remove the interval
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    // send a message to the server
    sendMessage() {
        const params = {
            sender: this.props.sender,
            receiver: this.state.receiver,
            message: this.state.text
        };

        this.setState({text: ''});
        if (!params.message || !params.receiver) {
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
            });
    }

    // handle an enter press
    handleKeyPress(event) {
        if (event.code === "Enter") {
            this.sendMessage();
        }
    }

    // handle a click of the send button
    handleClick(event){
        this.sendMessage();
    }

    // handle an update of the receiver field
    handleReceiverInput(event) {
        const input = event.target.value;
        this.setState({receiver: input}, this.displayMessages);
        if (input.length > 0) {
            this.searchUsers(input);
        } else {
            this.setState({userList: []});
        }
    }

    // pretty sure not used, too risky to delete
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
                this.setState({userList: res});
            });
    }

    // gets a list of the users you follow for autoComplete receiver field
    getFollowed(){
        const params = {
            sender: this.props.sender
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/getFollowed", options)
            .then(res => res.json())
            .then(res => {
                let followed = res.followed;
                this.setState({followed: followed});
            });
    }

    // for selection of receiver
    dropdown(){
        $('.dropdown-menu').toggleClass('show');
    }

    // update the receiver
    setReciever(event){
        const input = event.target.value;
        this.setState({receiver: input}, this.displayMessages);
        if (input.length > 0) {
            this.searchUsers(input);
        } else {
            this.setState({userList: []});
        }

        this.dropdown();
    }

    // note: the cog icon does nothing
    render() {
        const followed = this.state.followed.map((user,index) => (
            <button className={`dropdown-item`} onClick={this.setReciever} key={user.rowid} value={user.username}>{user.username} | {user.handle}</button>
        ));

        const messages = React.Children.toArray(this.state.messages.map(message => (
            <OneMessage message={message} user={this.state.id} />
        )));
        return(
            <div className={`messages`}>
                <div className="messages-title">
                    <h2 className={`messages-title-text`}>Messages</h2>
                    <div id="icons">
                        <input type="search" name="receiver" placeholder="Recipient"
                                className="rounded-pill messages-receiver-input" onBlur={this.handleBlur}
                                onFocus={this.handleFocus} onChange={this.handleReceiverInput}
                                value={this.state.receiver} autoComplete="off"/>
                        <button className="btn" type="button">
                            <FontAwesomeIcon className={`message-icon`} icon={faCog} size="2x" />
                        </button>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.dropdown}>
                                <FontAwesomeIcon className={`message-icon`} icon={faCommentAlt} size="2x" />
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {followed}
                            </div>
                        </div>
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
