import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/Explore.css';

class Explore extends Component {

    /* DEMO OF HOW TO RETRIEVE DATABASE DATA */
    // simplest - no params
    componentDidMount() {
        const options = {
            method: 'GET'
        };
        fetch("http://localhost:4000/getMostLiked", options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
    }

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
                <h2>Explore</h2>
            </div>
        );
    };
}

export default withRouter(Explore);
