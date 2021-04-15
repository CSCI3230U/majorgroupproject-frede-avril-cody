import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/Explore.css';

class Explore extends Component {
    render() {
        return(
            <div className={`explore`}>
                <h2>Explore</h2>
            </div>
        );
    };
}

export default withRouter(Explore);
