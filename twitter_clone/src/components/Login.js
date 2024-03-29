import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/Login.css';
import image from '../image/twitterBackground.png'; // picture from https://twitter.com

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: 'Please login'
        }
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.loginUnsuccessful = this.loginUnsuccessful.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    // handles a click of the login button
    handleLoginClick() {
        const params = {
            username: this.state.username,
            password: this.state.password
        };
        if (!params.username || !params.password) {
            return;
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/login", options)
            .then(res => res.json())
            .then(res => {
                if (res.authenticated) {
                    this.props.handleLogin(res.username, res.handle);
                } else {
                    this.loginUnsuccessful();
                }
            });

    }

    // update message based on unsuccessful login
    loginUnsuccessful() {
        this.setState({message: 'Login unsuccessful, please try again'})
    }

    // reset message if username or password is changed
    handleUsernameChange(event) {
        this.setState({username: event.target.value, message: 'Please login'});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value, message: 'Please login'});
    }

    render() {
        return(
            <div className={`LoginPage`}>
                <div className="loginImage" >
                    <img src={image} alt="login background not found"/>
                </div>
                <div className={`login`}>
                    <div className={`login-text-container`}>
                        <h2 className={`login-text`}>{this.state.message} </h2>
                    </div>
                    <div className={`login-inputs`}>
                        <input placeholder="Username" type="text" onChange={this.handleUsernameChange} className={`login-input login-default`}/>
                        <input placeholder="Password" type="password" onChange={this.handlePasswordChange} className={`login-input login-default`}/>
                    </div>
                    <div className={`login-button-container`}>
                        <button onClick={this.handleLoginClick} className={`rounded-pill login-button`}>Login</button>
                        <button onClick={this.props.displayRegister} className={`rounded-pill login-button`}>Register</button>
                    </div>
                </div>
            </div>

        );
    };
}

export default withRouter(Login);
