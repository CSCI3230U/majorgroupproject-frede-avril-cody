import React, {Component} from 'react';
// this component is used make the a single message,
// whether on the right side if your sending it or 
// lefts side if reciving
class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sending: true
        }
        this.Sending = this.Sending.bind(this);
        this.Reciving = this.Reciving.bind(this);
    }
    
    render() {
        return(
            <div>

            </div>
        );
    }
}