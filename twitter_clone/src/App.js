import React, { Fragment } from 'react';
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
import Register from './components/Register.js'
import NotFound from './components/NotFound.js'
import FollowRecommendations from './components/FollowRecommendations.js'
import { Route, Switch, Redirect} from 'react-router-dom';
import './styles/App.css';

// the main App
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,    // is user logged in
            username: '',       // username of logged in user
            handle: '',         // the handle of the logged in user
            register: false,    // if the register page should be displayed
            isConnectDisplayed: false,  // is the connect page currently displayed
            tweets: [],         // the tweets to display in the feed
            profileName: '',    // the name of the user to display in profile
            justLoggedIn: false,// true if the user has just logged in
            hashtagFlag: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.displayRegister = this.displayRegister.bind(this);
        this.connectDisplayed = this.connectDisplayed.bind(this);
        this.updateFeed = this.updateFeed.bind(this);
        this.updateFeedByHashtag = this.updateFeedByHashtag.bind(this);
        this.updateProfileName = this.updateProfileName.bind(this);
    }

    // used to update if connect is displayed (in which case don't show follow-recs)
    connectDisplayed(flag) {
        this.setState({isConnectDisplayed: flag});
    }

    // handles a successful login - props to Login component
    handleLogin(username, handle) {
        this.setState({
            loggedIn: true,
            username: username,
            profileName: username,
            handle: handle,
            isConnectDisplayed: false,
            justLoggedIn: true
        });

        // setState is async, so need to pass username directly
        this.updateFeed(username);
    }

    // handles a logout
    handleLogout() {
        this.setState({
            loggedIn: false
        });
    }

    // handles a successful registration - props to Register component
    handleRegister(username, handle) {
        this.setState({register: false});
        this.handleLogin(username, handle);
    }

    // update whether register should be displayed
    displayRegister(flag) {
        this.setState({register: flag});
    }

    updateFeedByHashtag(tweets) {
        this.setState({tweets: tweets, hashtagFlag: true});
    }

    // used to trigger feed updates - props to various components
    updateFeed(username) {
        const params = {
            username: username
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/populateFeed", options)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({tweets: res});
        });
    }

    // updates the name that should be in profile
    updateProfileName(username) {
        this.setState({profileName: username});
    }

    render() {
        // this is used to make sure feed always is shown first
        // causes React to complain because state isn't supposed to be updated in render
        const flag = this.state.justLoggedIn;
        if (flag) {
            this.setState({justLoggedIn: false});
        }
        // render based on the flags
        if (this.state.register) {
            return <Register    handleRegister={this.handleRegister}
                                displayRegister={this.displayRegister}/>;
        } else if (!this.state.loggedIn) {
            return <Login   handleLogin={this.handleLogin}
                            displayRegister={this.displayRegister}/>;
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
                        {flag ? <Redirect to="/feed"/> :
                        <Switch>
                            <Route exact path="/" render={() => {
                                return <Redirect to="/feed"/>}} />

                            <Route exact path="/connect" render={() => {
                                return <Connect connectDisplayed={this.connectDisplayed}
                                                username={this.state.username}
                                                updateFeed={this.updateFeed}
                                                updateProfileName={this.updateProfileName}/>}}/>

                            <Route exact path="/explore" component={Explore}/>

                            <Route exact path="/messages" render={() => {
                                return <Messages sender={this.state.username}/>}} />

                            <Route exact path="/profile" render={() => {
                                return <Profile profileName={this.state.profileName}
                                                username={this.state.username} />
                            }}/>

                            <Route exact path="/feed" render={() =>
                                <Fragment>
                                    <Tweet  username={this.state.username}
                                            updateFeed={this.updateFeed}/>
                                    <Feed   username={this.state.username}
                                            updateFeed={this.updateFeed}
                                            tweets={this.state.tweets}/>
                                </Fragment>
                            }/>

                            <Route component={NotFound} />
                        </Switch>}
                    </div>

                    <div className="rightSide">
                        <Search updateFeed={this.updateFeedByHashtag}/>
                        <News />
                        {!this.state.isConnectDisplayed &&
                            <FollowRecommendations username={this.state.username}
                                                updateFeed={this.updateFeed}
                                                updateProfileName={this.updateProfileName}/>}
                    </div>
                </div>
            );
        }
    }
}

export default App;
