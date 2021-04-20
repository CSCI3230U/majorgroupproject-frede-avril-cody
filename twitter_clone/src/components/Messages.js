import React, {Component} from 'react';
// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {faCog} from '@fortawesome/free-solid-svg-icons';
// import {faCommentAltPlus} from '@fortawesome/free-solid-svg-icons';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons';
import OneMessage from './OneMessage.js';
import '../styles/Messages.css';
import $ from "jquery";


class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            messages: [],
            receiver: '',
            interval: null,
            userList: [],
            id: 0,
            followed: []
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

    getFollowed(){
        const params = {
            profileName: this.props.sender

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

    dropdown(){
        $('.dropdown-menu').toggleClass('show');
    }

    setReciever(event){
        const input = event.target.text;
        this.setState({receiver: input}, this.displayMessages);
        if (input.length > 0) {
            this.searchUsers(input);
        } else {
            this.setState({userList: []});
        }

        this.dropdown();
    }

    render() {
        const followed = this.state.followed.map((user,index) => (
            <div key={index} className={`user`}>
                <a class="dropdown-item" href="#" onClick={this.setReciever}>{user.username} | {user.handle}</a>
            </div>
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
                                lassName="messages-receiver-input" onBlur={this.handleBlur}
                                onFocus={this.handleFocus} onChange={this.handleReceiverInput}
                                value={this.state.receiver} autoComplete="off" 
                                className={`rounded-pill messages-reciever-input`}/>
                        <button class="btn" type="button">
                            <FontAwesomeIcon className={`message-icon`} icon={faCog} size="2x" />
                        </button>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" id="dropdownButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.dropdown}>
                                <FontAwesomeIcon className={`message-icon`} icon={faCommentAlt} size="2x" />
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" onClick={this.setReciever}>Joe</a>
                                <a class="dropdown-item" href="#" onClick={this.setReciever}>Randy</a>
                                <a class="dropdown-item" href="#" onClick={this.setReciever}>Rupinder</a>
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
