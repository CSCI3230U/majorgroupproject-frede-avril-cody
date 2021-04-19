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

    render() {
        return(
            <div className={`profile`}>
                <h2>Profile</h2>
            </div>
        );
    };
}

export default Profile;
