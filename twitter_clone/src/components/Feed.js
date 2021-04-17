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
        this.getDateDisplay = this.getDateDisplay.bind(this);
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
    

    getDateDisplay(dateString){
        let display = "";
        let dateList = dateString.split(" ");
        let calendar = dateList[0].split("-");
        let time = dateList[1].split(":");

        let today = new Date();

        // if the tweet was done today
        if (calendar[2] == String(today.getDate())) {
            // if the tweet was posted in the same hour
            if (time[0] == String(today.getHours())){
                return display;
            } else { // if the tweet was poster earlier than an hour ago
                return display;
            }
        } else { // if the tweet wasn't posted today
            return display;
        }   
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
                                <p>{post.sender + " · " + post.time}</p>
                                <p>{post.message}</p>
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
