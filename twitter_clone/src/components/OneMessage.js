import React, {Component} from 'react';
// this component is used make the a single message,
// whether on the right side if your sending it or
// lefts side if reciving
class OneMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // conditionally render to left or right based on this.props.sender
        return(
            <>
                <p>{`${this.props.message.message} ${this.props.message.time}`}</p>
            </>
        );
    }
}

export default OneMessage;
