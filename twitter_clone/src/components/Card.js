import React, {Component} from 'react';
import '../styles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';

class Card extends Component {
    constructor(props) {
        super(props);
        // unimplemented props are this.props.username and this.props.handle eg. @joe
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
            <div className={`card container`}>
                <div className={`row card-vcentered inline`}>
                    <div className={`col-3 inline`}>
                        <img src={`images/profile/1.png`} alt="profile" className={`card-profilePic inline`}></img>
                    </div>
                    <div className={`col-6 inline`}>
                        <h6>{this.props.username}</h6>
                        <p>{this.props.handle}</p>
                    </div>
                    <div className={`col-3 inline`}>
                        <FontAwesomeIcon className={`card-options inline fa-lg`} onClick={this.handleLogoutClick} icon={faEllipsisH}/>
                    </div>
                </div>
            </div>
        );
    };
}

export default Card;
