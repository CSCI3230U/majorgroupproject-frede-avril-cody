import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/Register.css';


class Register extends Component {
    defaultMessage = 'Please complete this form to register a new account';
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmedPassword: '',
            handle: '',
            email: '',
            message: this.defaultMessage,
            usernameStyle: 'register-default',
            handleStyle: 'register-default',
            passwordStyle: 'register-default',
            confirmPasswordStyle: 'register-default',
            emailStyle: 'register-default'
        }
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.verifyUniqueness = this.verifyUniqueness.bind(this);
    }

    handleRegisterClick() {
        const params = {
            username: this.state.username,
            password: this.state.password,
            handle: this.state.handle,
            email: this.state.email
        };
        if (!params.username || !params.password || !params.email || !params.handle) {
            // implement handler
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
                    this.registerUnsuccessful(res.message);
                }
            });
    }

    registerUnsuccessful(message) {
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

    async handleChange(event) {
        const type = event.target.dataset.type;
        const style = type + "Style"
        const identifier = event.target.value;
        this.setState({[type]: identifier, message: this.defaultMessage});

        if (!identifier) {
            this.setState({[style]: 'register-default'});
            return;
        }

        const unique = await this.verifyUniqueness(type, identifier);
        const validator = new RegExp(/^[a-zA-Z0-9]+$/);

        if (unique && validator.test(identifier)) {
            console.log(this.state)
            this.setState({[style]: 'register-valid'});
            console.log(this.state)
        } else {
            this.setState({[style]: 'register-invalid'});
        }
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value, message: this.defaultMessage});
    }

    handleConfirmPasswordChange(event) {
        this.setState({confirmedPassword: event.target.value, message: this.defaultMessage});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value, message: this.defaultMessage});
    }


    render() {
        return(
            // TODO refactor to handle enter press
            <div className={`register`}>
                <h2>{this.state.message} </h2>
                <input  placeholder="Username" type="text" data-type="username"
                        className={this.state.usernameStyle} onChange={this.handleChange} />
                <input  placeholder="Password" type="password"
                        className={this.state.passwordStyle} onChange={this.handlePasswordChange} />
                <input  placeholder="Confirm Password" type="password"
                        className={this.state.confirmPasswordStyle} onChange={this.handleConfirmPasswordChange} />
                <input  placeholder="Handle" type="text" data-type="handle"
                        className={this.state.handleStyle} onChange={this.handleChange} />
                <input  placeholder="Email" type="email"
                        className={this.state.emailStyle} onChange={this.handleEmailChange} />
                <button onClick={this.handleRegisterClick}>Register</button>
            </div>
        );
    };
}

export default withRouter(Register);
