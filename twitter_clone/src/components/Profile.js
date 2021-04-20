import React, {Component} from 'react';
import '../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Feed.css";
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faShareSquare} from '@fortawesome/free-regular-svg-icons';
import { formatTime } from '../utilities.js';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            user: '',
            handle: '',
            followers: 0,
            followed: 0,
            id: '',
        };
        this.handleFollow = this.handleFollow.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
    }

    getProfileData() {
        const params = {
            profileName: this.props.profileName

        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/getProfile", options)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                let tweets = res.tweets;
                let user = res.username;
                let handle = res.handle;
                let followers = res.followers;
                let followed = res.follows;
                let id = res.rowid;
                this.setState({tweets: tweets, user: user, handle: handle, followers: followers, followed: followed, id: id});
            });
    }

    componentDidMount() {
        this.getProfileData();
    }

    handleFollow(event) {
        const params = {
            follower: this.props.username,
            followed: this.props.profileName
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/followByName", options)
            .then(res => res.json())
            .then(res => {
                this.getProfileData();
            });
        // TODO Instead of follow, should have a '+'
        // Then, in this method, the '+' for event.target should be changed to a 'check'
    }

    render() {
        const allTweets = this.state.tweets;

        const noTweets = (
            <div className={`feed_centered`}>
                <h4>No tweets around here...</h4>
            </div>);

        const tweets = this.state.tweets.reverse().map((post,index) => (
            <div key={index} className={`post`}>
                <div className={`container`}>

                </div>
                <div className={`feed_post`}>
                    <div className={`row`}>
                        <div className={`col-2`}>
                            <div className="feed-profilePic-container">
                                <img src={`images/profile/${post.senderId}.png`} alt="profile" className={`feed-profilePic`}></img>
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
                                    <button className={`profile-like`} onClick={this.handleLike} data-tweetid={post.rowid}>
                                        <FontAwesomeIcon className={`profile-like-icon feed_postActionIcon`} icon={faHeart} size="1x" />
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
            <div className={`profile  container`}>
                <div className={`profile-header container tweet_body`}>
                    <div className={`row`}>
                        <div className={`col`}>
                            <h4 className={`tweet_inline tweet-homeText`}>{this.props.profileName}</h4>
                        </div>
                    </div>
                </div>
                <div className={`profile-body`}>
                    <div className={`profile-background`}></div>
                    <div className={`profile-details`}>
                        <div className={`row container`}>
                            <div className={`col`}>
                                <img src={`images/profile/${this.state.id}.png`} alt="main profile" className={`profile-profilePic`}></img>
                                <h3>{this.state.user}</h3>
                                <p>{this.state.handle}</p>
                                <p className={`profile-inline`}>{this.state.followed} | Following</p>
                                <p className={`profile-inline`}>{this.state.followers} | Followers</p>
                            </div>
                            <div className={`col-2 profile-button-col`}>
                                <button onClick={this.handleFollow} className={`follow-recs-follow rounded-pill`}>Follow</button>
                            </div>
                        </div>
                    </div>
                    {allTweets.length > 0 ? tweets : noTweets}
                </div>


            </div>
        );
    };
}

export default Profile;
