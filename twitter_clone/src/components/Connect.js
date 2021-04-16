import React, {Component} from 'react';
import FollowRecommendations from './FollowRecommendations.js'
import '../styles/Connect.css';

class Connect extends Component {
    componentDidMount() {
        this.props.connectDisplayed(true);
    }

    componentWillUnmount() {
        this.props.connectDisplayed(false);
    }

    render() {
        return(
            <div className={`connect`}>
                <FollowRecommendations username={this.props.username}/>
            </div>
        );
    };
}

export default Connect;
