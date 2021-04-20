import React, {Component} from 'react';
// this component is used make the a single message,
// whether on the right side if your sending it or
// lefts side if reciving
class OneMessage extends Component {
    constructor(props) {
        super(props);
        this.isSender = this.isSender.bind(this);
    }

    isSender(personOne, personTwo){
        if(personOne === personTwo){
            return true
        }else{
            return false;
        }
    }

    render() {
        // conditionally render to left or right based on this.props.sender
        let _class = "sender";
        if (this.props.user === this.props.message.senderId) {
            _class = "receiver";
        }
        return(
            <>
                <div className={`messageContainer ${_class}`}>
                    <p className={`message-blue-box`}>{`${this.props.message.message}`}</p>
                    <p id="time">{`${this.props.message.time}`}</p>
                </div>
            </>
        );
    }
}

export default OneMessage;
