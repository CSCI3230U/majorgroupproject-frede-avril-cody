import React, {Component} from 'react';
import '../styles/FollowRecommendations.css';
import { Link } from 'react-router-dom';

class FollowRecommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: []
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.getImgUrl = this.getImgUrl.bind(this);
        this.updateProfileName = this.updateProfileName.bind(this);
    }

    handleRefresh() {
        const params = {
            username: this.props.username,
            profiles: 8
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

    componentDidMount() {
        this.handleRefresh();
    }

    handleFollow(event) {
        const params = {
            follower: this.props.username,
            followed: event.target.dataset.key
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

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
        // TODO Instead of follow, should have a '+'
        // Then, in this method, the '+' for event.target should be changed to a 'check'
    }
    getImgUrl(id) {
        if (id === 1) {
            return `images/profile/4randy.png`;
        } else {
            const index = id%18;
            return `images/profile/${index}.png`
        }
    }

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
                        <button className={`follow-recs-refresh`} onClick={this.handleRefresh}>Refresh</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default FollowRecommendations;
