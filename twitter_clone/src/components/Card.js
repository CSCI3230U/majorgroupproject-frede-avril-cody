import React, {Component} from 'react';
import '../styles/Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
        fetch("http://localhost:4000/login", {method: 'POST'});
        this.props.handleLogout();
    }

    render() {
        return(
            <div className={`card`}>
                <p>The profile card will go here</p>
                <button onClick={this.handleLogoutClick}>Logout</button>
            </div>
        );
    };
}

export default Card;
