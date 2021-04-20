import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-regular-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import {faCaretSquareRight} from '@fortawesome/free-regular-svg-icons';
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import {faChartBar} from '@fortawesome/free-regular-svg-icons';
import "../styles/Tweet.css";

class Tweet extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            userid: ''
        }
        this.handleText = this.handleText.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getImgUrl = this.getImgUrl.bind(this);
    }

    handleText(event) {
        this.setState({content: event.target.value});
    }

    handleKeyPress(event) {
        if (event.code === "Enter") {
            this.handleClick();
        }
    }

    handleClick() {
        const params = {
            username: this.props.username,
            content: this.state.content
        };
        if (!params.content || params.content.length > 140) {
            console.log("empty or too long");
            return;
        }

        this.setState({content: ''});

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/tweet", options)
            .then(res => res.json())
            .then(res => {
                this.props.updateFeed(this.props.username);
            });
    }

    // componentDidMount(){
    //     const params = {
    //         username: this.props.username
    //     };

    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify(params)
    //     };

    //     fetch("http://localhost:4000/", options)
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             // this.setState({: res});
    //         });
    // }

    getImgUrl(id) {
        if (id === 1) {
            return `images/profile/4randy.png`;
        } else {
            const index = id%18;
            return `images/profile/${index}.png`
        }
    }

    componentDidMount() {
        const params = {
            username: this.props.username
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/getUserId", options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({imgUrl: this.getImgUrl(res.id)});
            });
    }

    render() {
        return(
            <>
                <div className={`tweet_header container tweet_body`}>
                    <div className={`row`}>
                        <div className={`col`}>
                            <h4 className={`tweet_inline tweet-homeText`}>Home</h4>
                        </div>
                        <div className={`col-md-2 tweet-sparkle-container`}>
                            {/* <FontAwesomeIcon className={`tweet_star`} icon={faStar} size="1x" /> */}
                            <img src={`images/icons/sparkles.png`} alt="sparkles" className={`tweet-sparkles`}></img>
                        </div>
                    </div>
                </div>
                <div className={`tweet_tweet container tweet_body`}>
                    <div className={`row`}>
                        <div className={`col-2 tweet_profilePic`}>
                            <img src={this.state.imgUrl} alt="profile" className={`tweet-profilePic`}></img>
                        </div>
                        <div className={`col`}>
                            <div className="tweet_tweetContent">
                                <input type="text" name="tweet" placeholder="What's happening?"
                                        className={'tweet_tweetInput tweet_form-control'}
                                        onChange={this.handleText}
                                        onKeyPress={this.handleKeyPress}
                                        value={this.state.content}
                                        autoComplete="off" />
                            </div>
                            <div  className={`row`}>
                                <div className="col extras">
                                    <FontAwesomeIcon className={`tweet_tweetExtra fa-lg`} icon={faImage} />
                                    <FontAwesomeIcon className={`tweet_tweetExtra fa-lg`} icon={faCaretSquareRight}/>
                                    <FontAwesomeIcon className={`tweet_tweetExtra fa-lg`} icon={faChartBar}/>
                                    <FontAwesomeIcon className={`tweet_tweetExtra fa-lg`} icon={faSmile}/>
                                    <FontAwesomeIcon className={`tweet_tweetExtra fa-lg`} icon={faCalendarAlt}/>
                                </div>
                                <div className="col-3">
                                    <button className={'rounded-pill  tweet_submit'}
                                            onClick={this.handleClick}>
                                        Tweet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default Tweet;
