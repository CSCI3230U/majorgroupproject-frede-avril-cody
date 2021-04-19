import React, {Component} from 'react';
import '../styles/Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
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
                console.log(res);
            });
    }

    // handleFollow is untested
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
                this.props.updateFeed(this.props.profileName);
            });
        // TODO Instead of follow, should have a '+'
        // Then, in this method, the '+' for event.target should be changed to a 'check'
    }

    render() {
        return(
            <div className={`profile`}>
                <h2>{this.props.profileName}</h2>
                <button onClick={this.handleFollow} className={`follow-recs-follow rounded-pill`}>Follow</button>
            </div>
        );
    };
}

export default Profile;
