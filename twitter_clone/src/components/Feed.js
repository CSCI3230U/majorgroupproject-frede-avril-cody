import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/feed.css";
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faShareSquare} from '@fortawesome/free-regular-svg-icons';

class Feed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <div className={`feed_feed`}>
                    <div className={`container`}>

                    </div>
                    <div className={`feed_post`}>
                        <div className={`row`}>
                            <div className={`col-2`}>
                                <div className="feed_profilePic">
                                    
                                </div>
                            </div>
                            <div className={`col`}>
                                <div className="feed_postContent">
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className={``}>
                            <div  className={`row`}>
                                <div className={`col inline feed_centered`}>
                                    <FontAwesomeIcon className={`feed_postActionIcon`} icon={faComment} size="1x" />
                                </div>
                                <div className={`col inline feed_centered`}>
                                    <FontAwesomeIcon className={`feed_postActionIcon`} icon={faImage} size="1x" />
                                </div>
                                <div className={`col inline feed_centered`}>
                                    <FontAwesomeIcon className={`feed_postActionIcon`} icon={faHeart} size="1x" />     
                                </div>
                                <div className={`col inline feed_centered`}>
                                    <FontAwesomeIcon className={`feed_postActionIcon`} icon={faShareSquare} size="1x" />  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default Feed;