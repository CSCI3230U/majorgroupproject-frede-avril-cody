import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/Explore.css';

class Explore extends Component {

    /* DEMO OF HOW TO RETRIEVE DATABASE DATA */
    componentDidMount() {
        fetch("http://localhost:4000/tweets")
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
    }
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
