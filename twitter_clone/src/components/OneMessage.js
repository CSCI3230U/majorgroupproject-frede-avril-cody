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
        if(this.isSender(this.props.user,this.props.sender)){
            _class = "receiver";
        }
        return(
            <> 
                <div className={_class}>
                    <div className="messageContainer"> 
                        <p id="message">{`${this.props.message.message}`}</p> 
                        <p id="time">{`${this.props.message.time}`}</p>
                    </div>
                </div>
            </>
        );
    }
}

export default OneMessage;
