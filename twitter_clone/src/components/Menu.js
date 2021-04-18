import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faHashtag} from '@fortawesome/free-solid-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';

class Menu extends Component{
    constructor() {
        super();

        this.state = {

        }
        // this.setActiveTab = this.setActiveTab.bind(this)
    }
    // changeCurrentPageComponent(e){
    //     e.preventDefault();


    // }
    render(){
        return(
            <div className={`menu-menu`}>
                <FontAwesomeIcon className={`menu-twitter-icon`} icon={faTwitter} size="2x" />
                <div className={`menu-row inline`}>
                    <FontAwesomeIcon className={`inline menu-home-icon`} icon={faHome} size="2x" />
                    <Link to="/feed" className={`inline menu-option menu-home`}>Home</Link>
                </div>
                <div className={`menu-row inline`}>
                    <FontAwesomeIcon className={`inline`} icon={faHashtag} size="2x" />
                    <Link to="/explore" className={`menu-option`}>Explore</Link>
                </div>
                <div className={`menu-row inline`}>
                    <FontAwesomeIcon className={`inline`} icon={faEnvelope} size="2x" />
                    <Link to="/messages" className={`menu-option`}>Messages</Link>
                </div>
                <div className={`menu-row inline`}>
                    <FontAwesomeIcon className={`inline`} icon={faUsers} size="2x" />
                    <Link to="/connect" className={`menu-option`}>Connect</Link>
                </div>
                <div className={`menu-row inline`}>
                    <FontAwesomeIcon className={`inline`} icon={faUser} size="2x" />
                    <Link to="/profile" className={`menu-option inline`}>Profile</Link>
                </div>
                <div className={`menu-row inline`}>
                    <img src={`images/more.png`} alt="more" className={`menu-more inline`}></img>
                    <p className={`menu-option menu-more-text`} >More</p>
                </div>
                
                <div className=".btn">
                    <button type="button" className={`rounded-pill menu-tweet-button`}>Tweet</button>
                </div>
            </div>

        );
    };
}
export default Menu;
