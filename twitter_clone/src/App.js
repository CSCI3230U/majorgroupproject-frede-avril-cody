import React, { Fragment } from 'react';
// import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';
import Menu from './components/Menu.js'
import Tweet from './components/Tweet.js'
import Feed from './components/Feed.js'
import Search from './components/Search.js'
import News from './components/News.js'
import Card from './components/Card.js'
import Connect from './components/Connect.js'
import Explore from './components/Explore.js'
import Messages from './components/Messages.js'
import Profile from './components/Profile.js'
import Login from './components/Login.js'
import NotFound from './components/NotFound.js'
import FollowRecommendations from './components/FollowRecommendations.js'
import { Route, Switch, Redirect} from 'react-router-dom';
import './styles/App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            username: '',
            handle: '',
            isConnectDisplayed: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.connectDisplayed = this.connectDisplayed.bind(this);
    }

    connectDisplayed(flag) {
        this.setState({isConnectDisplayed: flag});
    }

    handleLogin(username, handle) {
        this.setState({
            loggedIn: true,
            username: username,
            handle: handle,
            isConnectDisplayed: false
        });
    }

    handleLogout() {
        this.setState({
            loggedIn: false
        });
    }

    render() {
        if (!this.state.loggedIn) {
            return <Login handleLogin={this.handleLogin} />;
        } else {
            return (
                <div className="App">
                    <div className="leftSide">
                        <Menu handle={this.state.handle} token={this.state.token}/>
                        <Card   handle={this.state.handle}
                                username={this.state.username}
                                handleLogout={this.handleLogout}/>
                    </div>
                    <div className="center">
                        <Switch>
                            <Route exact path="/" render={() => {
                                return <Redirect to="/feed"/>}} />
                            <Route exact path="/connect" render={() => {
                                return <Connect connectDisplayed={this.connectDisplayed} 
                                                username={this.state.username}/>}}/>
                            <Route exact path="/explore" component={Explore}/>
                            <Route exact path="/messages" component={Messages}/>
                            <Route exact path="/profile" component={Profile}/>

                            <Route exact path="/feed" render={() =>
                                <Fragment>
                                    <Tweet username={this.state.username} />
                                    <Feed username={this.state.username} />
                                </Fragment>
                            }/>

                            <Route component={NotFound} />
                        </Switch>
                    </div>

                    <div className="rightSide">
                        <Search />
                        <News />
                        {!this.state.isConnectDisplayed && <FollowRecommendations username={this.state.username} />}
                    </div>
                </div>
            );
        }
    }
}

export default App;
