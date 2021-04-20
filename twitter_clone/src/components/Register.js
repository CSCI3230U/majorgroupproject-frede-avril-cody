import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/Login.css';
import image from "../image/twitterBackground.png" // picture from https://twitter.com
const validator = require('validator');

class Register extends Component {
    defaultMessage = 'Please complete this form to register';
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmedPassword: '',
            handle: '',
            email: '',
            message: this.defaultMessage,
            usernameStyle: 'login-default',
            handleStyle: 'login-default',
            passwordStyle: 'login-default',
            confirmPasswordStyle: 'login-default',
            emailStyle: 'login-default'
        }
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleBackToLogin = this.handleBackToLogin.bind(this);
        this.verifyUniqueness = this.verifyUniqueness.bind(this);
        this.validName = this.validName.bind(this);
        this.validPassword = this.validPassword.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
    }

    handleRegisterClick() {
        const params = {
            username: this.state.username,
            password: this.state.password,
            handle: this.state.handle,
            email: this.state.email
        };

        if (!params.username) {
            this.displayMessage('Please enter a username');
            return;
        }

        if (!params.password) {
            this.displayMessage('Please enter a password');
            return;
        }

        if (!this.validPassword(params.password)) {
            this.displayMessage('Passwords require at least 4 characters including at least one letter and one number');
            return;
        }

        if (params.password !== this.state.confirmedPassword) {
            this.displayMessage(`Passwords don't match!`);
            return;
        }

        if (!params.handle) {
            this.displayMessage('Please enter a handle');
            return;
        }

        if (!params.email) {
            this.displayMessage('Please enter an email address');
            return;
        }

        if (!this.validName(params.username)) {
            this.displayMessage('Usernames must only contain letters and numbers');
            return;
        }

        if (!this.validName(params.handle)) {
            this.displayMessage('Handles must only contain letters and numbers');
            return;
        }

        if (!validator.isEmail(params.email)) {
            this.displayMessage(`Please enter a valid email address`);
            return;
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/register", options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.registered) {
                    this.props.handleRegister(res.username, res.handle);
                } else {
                    this.displayMessage(res.message);
                }
            });
    }

    displayMessage(message) {
        this.setState({message: message})
    }

    async verifyUniqueness(key, value) {
        const params = {
            [key]: value
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        return await fetch("http://localhost:4000/verifyUnique", options)
            .then(res => res.json())
            .then(res => {
                return res.unique;
            });
    }

    validName(name) {
        const validator = new RegExp(/^[a-zA-Z0-9]+$/);
        return validator.test(name);
    }

    validPassword(password) {
        return password.length > 3 && password.search(/\d/) !== -1 && password.search(/[a-zA-z]/) !== -1;
    }

    async handleChange(event) {
        const type = event.target.dataset.type;
        const style = type + "Style"
        const identifier = event.target.value;
        this.setState({[type]: identifier, message: this.defaultMessage});

        if (!identifier) {
            this.setState({[style]: 'login-default'});
            return;
        }

        const unique = await this.verifyUniqueness(type, identifier);

        if (unique && this.validName(identifier)) {
            console.log(this.state)
            this.setState({[style]: 'register-valid'});
            console.log(this.state)
        } else {
            this.setState({[style]: 'register-invalid'});
        }
    }

    handlePasswordChange(event) {
        const password = event.target.value;
        this.setState({password: password, message: this.defaultMessage});
        if (this.validPassword(password)) {
            this.setState({passwordStyle: 'register-valid'});
        } else {
            this.setState({passwordStyle: 'register-invalid'});
        }
        if (password === this.state.confirmedPassword) {
            this.setState({confirmPasswordStyle: 'register-valid'});
        } else {
            this.setState({confirmPasswordStyle: 'login-default'});
        }
    }

    handleConfirmPasswordChange(event) {
        const confirmedPassword = event.target.value;
        this.setState({confirmedPassword: confirmedPassword, message: this.defaultMessage});
        if (confirmedPassword === this.state.password) {
            this.setState({confirmPasswordStyle: 'register-valid'});
        } else {
            this.setState({confirmPasswordStyle: 'register-invalid'});
        }
    }

    handleEmailChange(event) {
        const email = event.target.value;
        this.setState({email: email, message: this.defaultMessage});
        if (validator.isEmail(email)) {
            this.setState({emailStyle: 'register-valid'});
        } else {
            this.setState({emailStyle: 'register-invalid'});
        }
    }

    handleBackToLogin() {
        this.props.displayRegister(false);
    }

    render() {
        return(
            // TODO refactor to handle enter press
            <div className={`LoginPage`}>
                <div className="loginImage" >
                    <img src={image} alt="NotFound"/>
                </div>
                <div className={`login`}>
                    <div className={`login-text-container`}>
                        <h2 className={`login-text`}>{this.state.message} </h2>
                    </div>
                    <div className={`login-inputs`}>
                        <input  placeholder="Username" type="text" data-type="username"
                                className={`login-input ${this.state.usernameStyle}`} onChange={this.handleChange} />
                        <input  placeholder="Password" type="password"
                                className={`login-input ${this.state.passwordStyle}`} onChange={this.handlePasswordChange} />
                        <input  placeholder="Confirm Password" type="password"
                                className={`login-input ${this.state.confirmPasswordStyle}`} onChange={this.handleConfirmPasswordChange} />
                        <input  placeholder="Handle" type="text" data-type="handle"
                                className={`login-input ${this.state.handleStyle}`} onChange={this.handleChange} />
                        <input  placeholder="Email" type="email"
                                className={`login-input ${this.state.emailStyle}`} onChange={this.handleEmailChange} />
                    </div>
                    <div className={`register-button-container`}>
                        <button className={"login-button rounded-pill"} onClick={this.handleRegisterClick}>Register</button>
                        <button className={"login-button rounded-pill"} onClick={this.handleBackToLogin}>Back To Login</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(Register);
