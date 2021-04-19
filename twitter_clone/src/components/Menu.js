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
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
//
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
                    <Link to="/feed" className={`menu-hover`}>
                        <div className={`row menu-row`}>
                            <div className={`col-3`}>
                                <FontAwesomeIcon className={`menu-home-icon`} icon={faHome} size="2x" />
                            </div>
                            <div className={`col menu-home-option`}>
                                <p className={`menu-home`}>Home</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/explore" className={`menu-hover`}>
                        <div className={`row menu-row`}>
                            <div className={`col-3`}>
                                <FontAwesomeIcon className={`menu-icon`} icon={faHashtag} size="2x" />
                            </div>
                            <div className={`col menu-option`}>
                                <p className={`menu-option`}>Explore</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/messages" className={`menu-hover`}>
                        <div className={`row menu-row`}>
                            <div className={`col-3`}>
                                <FontAwesomeIcon className={`menu-icon`} icon={faEnvelope} size="2x" />
                            </div>
                            <div className={`col menu-option`}>
                                <p className={`menu-option`}>Messages</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/connect" className={`menu-hover`}>
                        <div className={`row menu-row`}>
                            <div className={`col-3`}>
                                <FontAwesomeIcon className={`menu-icon`} icon={faUsers} size="2x" />
                            </div>
                            <div className={`col menu-option`}>
                                <p className={`menu-option`}>Connect</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/profile" className={`menu-hover`}>
                        <div className={`row menu-row`}>
                            <div className={`col-3`}>
                                <FontAwesomeIcon className={`menu-icon`} icon={faUser} size="2x" />
                            </div>
                            <div className={`col menu-option`}>
                                <p className={`menu-option`}>Profile</p>
                            </div>
                        </div>
                    </Link>
                    <a  href="http://localhost:4000/analytics" target="_blank"
                        rel="noopener noreferrer">
                        <div className={`row menu-row`}>
                            <div className={`col-3`}>
                                {/* // TODO change to chart icon */}
                                <FontAwesomeIcon className={`menu-icon`} icon={faEllipsisH} size="2x" />
                            </div>
                            <div className={`col menu-option`}>
                                <p className={`menu-option`}>Analytics</p>
                            </div>
                        </div>
                    </a>
                </div>
                <br />
                <div className=".btn">
                    <button type="button" className={`rounded-pill menu-tweet-button`}>Tweet</button>
                </div>
            </div>

        );
    };
}
export default Menu;
