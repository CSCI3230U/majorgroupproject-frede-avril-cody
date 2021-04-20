import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Search from "./Search.js"
import '../styles/Explore.css';

/* not really implemented...vision was to populate based on most popular hashtags
that would be clickable and would populate the feed in a similar way to search */
class Explore extends Component {

    render() {
        return(
            <div className={`explore`}>
                <div className={`title`}>
                    <h2>Explore</h2>
                </div>
                <div className={`search`}>
                    <Search/>
                </div>
                <div className="hashtagContainer">
                    <div className={`hashtag`}>
                        <p>#instagram</p>
                    </div>
                    <div className={`hashtag`}>
                        <p>#help</p>
                    </div>
                    <div className={`hashtag`}>
                        <p> #Chavintrial</p>
                    </div>
                    <div className={`hashtag`}>
                        <p> #Bitcon</p>
                    </div>
                    <div className={`hashtag`}>
                        <p>#Stocks</p>
                    </div>
                    <div className={`hashtag`}>
                        <p>#FacebookUnderFire</p>
                    </div>
                    <div className={`hashtag`}>
                        <p>#Cats</p>
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(Explore);
