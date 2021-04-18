import React, {Component} from 'react';
// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {faCog} from '@fortawesome/free-solid-svg-icons';
// import {faCommentAltPlus} from '@fortawesome/free-solid-svg-icons';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons';
import '../styles/Messages.css';


class Messages extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }
    send(){
        let text = document.getElementsByClassName("Input");
        console.log(text.value);
    }
    render() {
        return(
            <div className={`messages`}>
                <div className="title"> 
                    <h2>Messages</h2>
                    <div id="icons">    
                        <a> <FontAwesomeIcon className={`menu-icon`} 
                        icon={faCog} size="2x" /></a>
                        <a>
                        <FontAwesomeIcon className={`menu-icon`} 
                        icon={faCommentAlt} size="2x" />
                        </a>
                    </div>
                </div>
                <div className="messageArea">
                    
                    
                </div>
                <div className="sendAMessage"> 
                    <div className="textArea">
                        <input type="text" className="Input"placeholder="Send something"/>
                    </div>
                    <div id="sendBtn"> 
                        <button type="button"><FontAwesomeIcon className={`menu-icon`} 
                        icon={faPaperPlane} size="1x" onClick={this.send}/></button>

                    </div>
                </div>
            </div>
        );
    };
}

export default Messages;
