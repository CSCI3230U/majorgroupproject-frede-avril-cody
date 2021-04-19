import React, {Component} from 'react';
import '../styles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';

class Card extends Component {
    constructor(props) {
        super(props);
        // unimplemented props are this.props.username and this.props.handle eg. @joe
        this.state = {
            showLogout: false
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleEllipsisClick = this.handleEllipsisClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleLogoutClick() {
        this.props.handleLogout();
    }

    handleEllipsisClick() {
        this.setState({showLogout: true});
    }

    handleBlur() {
        console.log("handleBlur called")
    }

    render() {
        return(
            <div className={`card container`}>
                {this.state.showLogout && <div className="card-logout"> </div>}
                <div className={`row card-vcentered inline`}>
                    <div className={`col-3 inline`}>
                        <img src={`images/profile/1.png`} alt="profile" className={`card-profilePic inline`}></img>
                    </div>
                    <div className={`col-6 inline`}>
                        <h6>{this.props.username}</h6>
                        <p>{this.props.handle}</p>
                    </div>
                    <div className={`col-3 inline`}>
                        <FontAwesomeIcon    className={`card-options inline fa-lg`}
                                            onClick={this.handleEllipsisClick}
                                            onBlur={this.handleBlur}
                                            icon={faEllipsisH}/>
                    </div>
                </div>
            </div>
        );
    };
}

export default Card;
