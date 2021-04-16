import React, {Component} from 'react';
import '../styles/FollowRecommendations.css';

class FollowRecommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: []
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
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
        console.log(event.target.dataset.key);
        const params = {
            follower: this.props.username,
            followed: event.target.dataset.key
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/follow", options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
        // TODO Instead of follow, should have a '+'
        // Then, in this method, the '+' for event.target should be changed to a 'check'
    }

    render() {
        const recommendations = this.state.recommendations.map(i => (
            <li key={i.rowid}>{i.username + " " + i.handle}
            <button key={i.rowid} data-key={i.rowid} onClick={this.handleFollow}>Follow</button></li>
        ));
        return(
            <div className={`follow-reqs`}>
                <button onClick={this.handleRefresh}>Refresh</button>
                <ul>{recommendations}</ul>
            </div>
        );
    };
}

export default FollowRecommendations;
