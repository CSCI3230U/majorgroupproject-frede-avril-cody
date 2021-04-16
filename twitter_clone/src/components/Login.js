import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleLogin();
    }


    render() {
        return(
            <div className={`login`}>
                <h2>Please login</h2>
                <button onClick={this.handleClick}>Login</button>
            </div>
        );
    };
}

export default withRouter(Login);
