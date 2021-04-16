import React, {Component} from 'react';
import '../styles/Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return(
            <div className={`card`}>
                <p>The profile card will go here</p>
                <button onClick={this.props.handleLogoutClick}>Logout</button>
            </div>
        );
    };
}

export default Card;
