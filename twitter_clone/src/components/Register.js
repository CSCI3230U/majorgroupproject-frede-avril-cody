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
            message: this.defaultMessage
        }
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleHandleChange = this.handleHandleChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
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

    verifyUniqueness(key, value) {
        if (!value || value.length < 3) {
            return;
        }
        
        const params = {
            [key]: value
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/verifyUnique", options)
            .then(res => res.json())
            .then(res => {
                console.log(res);

            });
    }

    handleUsernameChange(event) {
        const username = event.target.value;
        this.setState({username: username, message: this.defaultMessage});
        this.verifyUniqueness('username', username);
    }

    handleHandleChange(event) {
        const handle = event.target.value;
        this.setState({handle: handle, message: this.defaultMessage});
        this.verifyUniqueness('handle', handle);
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
                <input placeholder="Username" type="text" onChange={this.handleUsernameChange} />
                <input placeholder="Password" type="password" onChange={this.handlePasswordChange} />
                <input placeholder="Confirm Password" type="password" onChange={this.handleConfirmPasswordChange} />
                <input placeholder="Handle" type="text" onChange={this.handleHandleChange} />
                <input placeholder="Email" type="email" onChange={this.handleEmailChange} />
                <button onClick={this.handleRegisterClick}>Register</button>
            </div>
        );
    };
}

export default withRouter(Register);
