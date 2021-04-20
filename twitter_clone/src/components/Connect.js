import React, {Component} from 'react';
import FollowRecommendations from './FollowRecommendations.js'
import '../styles/Connect.css';

// shows the follow recommendations prominently
class Connect extends Component {
    // notify App that connect is displayed, so hide follow recs
    componentDidMount() {
        this.props.connectDisplayed(true);
    }

    // notify App that connect is no longer displayed, so show follow recs
    componentWillUnmount() {
        this.props.connectDisplayed(false);
    }

    render() {
        return(
            <div className={`connect`}>
                <FollowRecommendations  username={this.props.username}
                                        updateProfileName={this.props.updateProfileName}
                                        updateFeed={this.props.updateFeed}/>
            </div>
        );
    };
}

export default Connect;
