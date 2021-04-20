import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Feed.css";
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faShareSquare} from '@fortawesome/free-regular-svg-icons';
import { formatTime } from '../utilities.js';

// displays the tweets
class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: `images/profile/1.png`
        };
        this.handleLike = this.handleLike.bind(this);
        this.getImgUrl = this.getImgUrl.bind(this);
    }

    // load feed
    componentDidMount() {
        this.props.updateFeed(this.props.username);
    }

    // handle a click of the like
    // users are allowed to like multiple times
    handleLike(event) {
        const params = {
            tweetid: event.currentTarget.dataset.tweetid,
            username: this.props.username
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/like", options)
            .then(res => res.json())
            .then(res => {            });

        this.componentDidMount();
    }

    // get the img url based on the id
    getImgUrl(id) {
        if (id === 1) {
            return `images/profile/4randy.png`; // special pic for randy
        } else {
            const index = id%18;
            return `images/profile/${index}.png`
        }
    }

    render() {
        const allPosts = this.props.tweets;

        const noPosts = (
            <div className={`feed_centered`}>
                <h4>Follow some people!</h4>
            </div>);
        const posts = this.props.tweets.reverse().map((post,index) => (
            <div key={index} className={`post`}>
                <div className={`container`}>

                </div>
                <div className={`feed_post`}>
                    <div className={`row`}>
                        <div className={`col-2`}>
                            <div className="feed-profilePic-container">
                                <img src={this.getImgUrl(post.senderId)} alt="profile" className={`feed-profilePic`}></img>
                            </div>
                        </div>
                        <div className={`col`}>
                            <div className="feed_postContent">
                                <p><b>{post.sender}</b> · {formatTime(post.time)}</p>
                                <p>{post.message}</p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className={``}>
                        <div  className={`row`}>
                            <div className={`col inline feed_centered feed_icon`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faComment} size="1x" />
                            </div>
                            <div className={`col inline feed_centered feed_icon`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faImage} size="1x" />
                            </div>
                            <div className={`col inline feed_centered feed_icon myHover`}>
                                    <button  className={`feed_like`} onClick={this.handleLike} data-tweetid={post.rowid}>
                                        <FontAwesomeIcon className={`feed_like_icon feed_postActionIcon`} icon={faHeart} size="1x" />
                                        <p className={`likes-display`}>{post.likes}</p>
                                    </button>

                            </div>
                            <div className={`col inline feed_centered feed_icon`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faShareSquare} size="1x" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));

        return(

            <div className={`feed_feed`}>
                {allPosts.length > 0 ? posts : noPosts}
            </div>
        );
    };
}

export default Feed;
