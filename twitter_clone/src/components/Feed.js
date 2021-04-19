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
            loaded: false,
        };
        this.getTimeDisplay = this.getTimeDisplay.bind(this);
        // this.formatResponseTime = this.formatResponseTime.bind(this);
    }

    componentDidMount() {
        this.props.updateFeed(this.props.username);
    }

    // formatResponseTime(){
    //     // let retrieved = ;
    //     let formatted = this.props.posts;
    //
    //     formatted.forEach(post => {
    //         let formattedTime = this.getTimeDisplay(post.time);
    //         console.log("hey");
    //         post["time"] = formattedTime;
    //     });
    //
    //     this.setState({posts: formatted});
    //     console.log(formatted);
    // }

    getTimeDisplay(dateString){
        let display = "3h";
        let dateList = dateString.split(" ");
        let calendar = dateList[0].split("-");
        let time = dateList[1].split(":");

        let today = new Date();

        // if the tweet was done today
        if (calendar[2] === String(today.getDate())) {
            // if the tweet was posted in the same hour
            if (time[0] === String(today.getHours())){
                return display;
            } else { // if the tweet was poster earlier than an hour ago
                return display;
            }
        } else { // if the tweet wasn't posted today
            return display;
        }
    }

    render() {
        const allPosts = this.props.posts;

        const noPosts = (
            <div className={`feed_centered`}>
                <h4>Follow some people!</h4>
            </div>);
        console.log(this.props)
        const posts = this.props.posts.reverse().map((post,index) => (
            <div key={index} className={`post`}>
                <div className={`container`}>

                </div>
                <div className={`feed_post`}>
                    <div className={`row`}>
                        <div className={`col-2`}>
                            <div className="feed-profilePic-container">
                                <img src={`images/profile/${post.senderId}.png`} alt="profile" className={`feed-profilePic`}></img>
                            </div>
                        </div>
                        <div className={`col`}>
                            <div className="feed_postContent">
                                <p><b>{post.sender}</b> · {post.time}</p>
                                <p>{post.message}</p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className={``}>
                        <div  className={`row`}>
                            <div className={`col inline feed_centered feed_icon`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faComment} size="1x" />
                            </div>
                            <div className={`col inline feed_centered feed_icon`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faImage} size="1x" />
                            </div>
                            <div className={`col inline feed_centered feed_icon`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faHeart} size="1x" />
                            </div>
                            <div className={`col inline feed_centered feed_icon`}>
                                <FontAwesomeIcon className={`feed_postActionIcon`} icon={faShareSquare} size="1x" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));

        return(

            <div className={`feed_feed`}>
                {allPosts.length > 0 ? posts : noPosts}
            </div>
        );
    };
}

export default Feed;
