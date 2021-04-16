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

    render() {
        const recommendations = this.state.recommendations.map(i => (
            <li key={i.rowid}>{i.username + " " + i.handle}</li>
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
