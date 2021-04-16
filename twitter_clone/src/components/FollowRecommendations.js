import React, {Component} from 'react';
import '../styles/FollowRecommendations.css';

class FollowRecommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: {}
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
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
                console.log(res);
            });
    }

    render() {
        return(
            <div className={`follow-reqs`}>
                <h2>FollowRecommendations</h2>
            </div>
        );
    };
}

export default FollowRecommendations;
