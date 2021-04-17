import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Feed.css";
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faShareSquare} from '@fortawesome/free-regular-svg-icons';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loaded: false,
        };
    }

    componentDidMount() {
        const params = {
            username: this.props.username
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/populateFeed", options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({posts: res});
            });
    }

    render() {
        const posts = this.state.posts.map((post,index) => (
            <div key={index} className={`post`}>
                <div className={`container`}>

                </div>
                <div className={`feed_post`}>
                    <div className={`row`}>
                        <div className={`col-2`}>
                            <div className="feed_profilePic">

                            </div>
                        </div>
                        <div className={`col`}>
                            <div className="feed_postContent">
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className={``}>
                        <div  className={`row`}>
                            <div className={`col inline feed_centered`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faComment} size="1x" />
                            </div>
                            <div className={`col inline feed_centered`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faImage} size="1x" />
                            </div>
                            <div className={`col inline feed_centered`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faHeart} size="1x" />
                            </div>
                            <div className={`col inline feed_centered`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faShareSquare} size="1x" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));

        return(
            <div className={`feed_feed`}>
                {posts}
            </div>
        );
    };
}

export default Feed;
