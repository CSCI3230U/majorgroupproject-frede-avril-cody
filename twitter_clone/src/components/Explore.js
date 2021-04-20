import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Search from "./Search.js"
import '../styles/Explore.css';

class Explore extends Component {

    /* DEMO OF HOW TO RETRIEVE DATABASE DATA */
    // simplest - no params
    // componentDidMount() {
    //     const options = {
    //         method: 'GET'
    //     };
    //     fetch("http://localhost:4000/getMostLiked", options)
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //         });
    // }

    // with params
    // componentDidMount() {
    //     const params = {
    //         sender: 3
    //     };
    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify(params)
    //     };
    //
    //     fetch("http://localhost:4000/tweets", options)
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //         });
    // }
    /* END OF DEMO */

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
