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
                <div className={`container`}>
                    <div className={`row`}>
                        <div className={`col-3`}>
                            <FontAwesomeIcon className={`menu-home-icon`} icon={faHome} size="2x" />
                        </div>
                        <div className={`col menu-home-option`}>
                            <Link to="/feed" className={`menu-home`}>Home</Link>
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className={`col-3`}>
                            <FontAwesomeIcon className={`menu-icon`} icon={faHashtag} size="2x" />
                        </div>
                        <div className={`col menu-option`}>
                            <Link to="/explore" className={`menu-option`}>Explore</Link>
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className={`col-3`}>
                            <FontAwesomeIcon className={`menu-icon`} icon={faEnvelope} size="2x" />
                        </div>
                        <div className={`col menu-option`}>
                            <Link to="/messages" className={`menu-option`}>Messages</Link>
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className={`col-3`}>
                            <FontAwesomeIcon className={`menu-icon`} icon={faUsers} size="2x" />
                        </div>
                        <div className={`col menu-option`}>
                            <Link to="/connect" className={`menu-option`}>Connect</Link>
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className={`col-3`}>
                            <FontAwesomeIcon className={`menu-icon`} icon={faUser} size="2x" />
                        </div>
                        <div className={`col menu-option`}>
                            <Link to="/profile" className={`inline`}>Profile</Link>
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className={`col-3`}>
                            <img src={`images/more.png`} alt="more" className={`menu-more menu-icon`}></img>
                        </div>
                        <div className={`col menu-option`}>
                            <p className={`menu-more-text`} >More</p>  
                        </div>
                    </div>
                </div>
                
                <div className=".btn">
                    <button type="button" className={`rounded-pill menu-tweet-button`}>Tweet</button>
                </div>
            </div>

        );
    };
}
export default Menu;
