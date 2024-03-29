import React, {Component} from 'react';
import '../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Feed.css";
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faShareSquare} from '@fortawesome/free-regular-svg-icons';
import { formatTime } from '../utilities.js';

// shows a user's profile information and tweets
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],         // the tweets to display
            user: '',           // the user to display
            handle: '',         // the user's handle
            followers: 0,       // the number of followers they have
            followed: 0,        // the number of users they follow
            id: '',             // the id
            isFollowing: false
        };
        this.getImgUrl = this.getImgUrl.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }

    // handles a click of the like button
    // a user can like a tweet multiple times
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
            .then(res => {
                // do nothing explicitly
            });

        this.componentDidMount();
    }

    // get the data to display
    getProfileData() {
        const params = {
            profileName: this.props.profileName,
            username: this.props.username
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/getProfile", options)
            .then(res => res.json())
            .then(res => {
                let tweets = res.tweets;
                let user = res.username;
                let handle = res.handle;
                let followers = res.followers;
                let followed = res.follows;
                let id = res.rowid;
                let isFollowing = res.isFollowing;
                this.setState({ tweets: tweets,
                                user: user,
                                handle: handle,
                                followers: followers,
                                followed: followed,
                                id: id,
                                isFollowing: isFollowing});
            });
    }

    // load data on component mount
    componentDidMount() {
        this.getProfileData();
    }

    // force update if the profileName has changed
    componentDidUpdate(prevProps) {
        if (prevProps.profileName !== this.props.profileName) {
            this.getProfileData();
        }
    }

    // handle a click of the follow button
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
    
    // note: unlike in follow recs, this one DOES query the db for follow button display
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
                                    <button className={`profile-like`} onClick={this.handleLike} data-tweetid={post.rowid}>
                                        <FontAwesomeIcon className={`profile-like-icon feed_postActionIcon`} icon={faHeart} size="1x" />
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
        // bg source: https://www.goodfreephotos.com/albums/other-landscapes/agriculture-landscape-under-clouds-and-sky.jpg
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
                    <div className={`profile-background`}>
                        <img src={`images/profile/profileBackground.jpg`} alt="profileBack" className={`profile-background`}></img>
                    </div>
                    <div className={`profile-details`}>
                        <div className={`row container`}>
                            <div className={`col-9`}>
                                <img src={`images/profile/${this.state.id}.png`} alt="main profile" className={`profile-profilePic`}></img>
                                <h3>{this.state.user}</h3>
                                <p>{this.state.handle}</p>
                                <p className={`profile-inline`}>{this.state.followed} | Following</p>
                                <p className={`profile-inline`}>{this.state.followers} | Followers</p>
                            </div>
                            <div className={`col-3 profile-button-col`}>
                                <button onClick={this.handleFollow}
                                        className={`profile-follow rounded-pill`}>
                                        {this.state.isFollowing ? "Following!" : "Follow"}</button>
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
