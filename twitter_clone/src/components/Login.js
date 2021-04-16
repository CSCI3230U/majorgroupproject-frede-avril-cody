import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/Login.css';

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
                console.log(res);
                if (res.authenticated) {
                    this.props.handleLogin(res.token, res.handle);
                } else {
                    this.loginUnsuccessful();
                }
            });

    }

    loginUnsuccessful() {
        this.setState({message: 'Login unsuccessful, please try again'})
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value, message: 'Please login'});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value, message: 'Please login'});
    }

    render() {
        return(
            // TODO refactor to handle enter press
            <div className={`login`}>
                <h2>{this.state.message} </h2>
                <input placeholder="Username" type="text" onChange={this.handleUsernameChange} />
                <input placeholder="Password" type="password" onChange={this.handlePasswordChange} />
                <button onClick={this.handleLoginClick}>Login</button>
            </div>
        );
    };
}

export default withRouter(Login);
