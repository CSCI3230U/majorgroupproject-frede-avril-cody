import React, {Component} from 'react';
import '../styles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';

class Card extends Component {
    constructor(props) {
        super(props);
        // unimplemented props are this.props.username and this.props.handle eg. @joe
        this.state = {
            showLogout: false,
            imgUrl: `images/profile/1.png`
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleEllipsisClick = this.handleEllipsisClick.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.getImgUrl = this.getImgUrl.bind(this);
    }

    handleLogoutClick() {
        this.props.handleLogout();
    }

    handleEllipsisClick() {
        this.setState({showLogout: true});
    }

    onMouseLeave() {
        this.setState({showLogout: false});
    }

    getImgUrl(id) {
        if (id === 1) {
            return `images/profile/4randy.png`;
        } else {
            const index = id%18;
            return `images/profile/${index}.png`
        }
    }

    componentDidMount() {
        const params = {
            username: this.props.username
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/getUserId", options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({imgUrl: this.getImgUrl(res.id)});
            });
    }

    render() {
        return(
            <div className={`card container`} onMouseLeave={this.onMouseLeave}>
                {this.state.showLogout && <div className="card-logout">
                <div className="card-logout-container" onClick={this.handleLogoutClick}>
                <p className={`card-logout-text`}>
                Logout from Twitter</p></div></div>}
                <div className={`row card-vcentered inline`}>
                    <div className={`col-3 inline`}>
                        <img src={this.state.imgUrl} alt="profile" className={`card-profilePic inline`}></img>
                    </div>
                    <div className={`col-6 inline`}>
                        <h6>{this.props.username}</h6>
                        <p>{this.props.handle}</p>
                    </div>
                    <div className={`col-3 inline`}>
                        <FontAwesomeIcon    className={`card-options inline fa-lg`}
                                            onClick={this.handleEllipsisClick}
                                            icon={faEllipsisH}/>
                    </div>
                </div>
            </div>
        );
    };
}

export default Card;
