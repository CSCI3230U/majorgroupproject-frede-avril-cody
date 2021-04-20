import React, {Component} from 'react';
import '../styles/FollowRecommendations.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';

// shows random users you may want to follow
class FollowRecommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: []
        }
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.getImgUrl = this.getImgUrl.bind(this);
        this.updateProfileName = this.updateProfileName.bind(this);
    }

    // handle a click of the refresh icon
    handleRefresh() {
        const params = {
            username: this.props.username,
            profiles: 5
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/whoToFollow", options)
            .then(res => res.json())
            .then(res => {
                this.setState({recommendations: res});
            });
    }

    // same behaviour as handleRefresh
    componentDidMount() {
        this.handleRefresh();
    }

    // handle a click of the follow button
    handleFollow(event) {
        const params = {
            follower: this.props.username,
            followed: event.target.dataset.key
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        /*  This is a hacky way to do this, we know if a user is displayed they
            are not followed, so we can use that to display the correct follow
            status without additional database queries. The logic doesn't hold
            up if you count server restarts, not intended to, just a quick fix. */
        if (event.target.dataset.following === "false") {
            event.target.dataset.following = "true";
            event.target.innerText = "Following!";
        } else {
            event.target.dataset.following = "false";
            event.target.innerText = "Follow";
        }

        fetch("http://localhost:4000/follow", options)
            .then(res => res.json())
            .then(res => {
                this.props.updateFeed(this.props.username);
            });
    }

    // get the img url based on the id
    getImgUrl(id) {
        if (id === 1) {
            return `images/profile/4randy.png`;
        } else {
            const index = id%18;
            return `images/profile/${index}.png`
        }
    }

    // on a click on the username, update the App's state accordingly
    updateProfileName(e) {
        this.props.updateProfileName(e.target.innerText);
    }

    render() {
        const recommendations = this.state.recommendations.map(i => (
            <div key={i.rowid} className={`row news-line follow-recs-side-padding follow-recs-hover-effect`}>
                <div className={`col-3 inline`}>
                    <img src={this.getImgUrl(i.rowid)} alt="profile" className={`card-profilePic inline`}></img>
                </div>
                <div className={`col-6 inline`}>
                    <Link to="/profile" onClick={this.updateProfileName}><h6>{i.username}</h6></Link>
                    <p>{i.handle}</p>
                </div>
                <button data-key={i.rowid}
                        data-following="false"
                        onClick={this.handleFollow}
                        className={`follow-recs-follow rounded-pill`}>Follow</button>
            </div>
        ));
        return(
            <div className={`follow-recs container`}>
                <div className={`follow-recs-fix`}>
                    <div className={`row follow-recs-line follow-recs-side-padding`}>
                        <h3>Follow Recommendations</h3>
                    </div>
                    {recommendations}
                    <div className={`row follow-recs-footer follow-recs-side-padding`}>
                        <button className={`follow-recs-refresh`} onClick={this.handleRefresh}><FontAwesomeIcon className={`follow-recs-icon`} icon={faSyncAlt} size="1x" /></button>
                    </div>
                </div>
            </div>
        );
    };
}

export default FollowRecommendations;
