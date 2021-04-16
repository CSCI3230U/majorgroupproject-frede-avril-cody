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
            handle: '',
            token: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(handle, token) {
        this.setState({
            loggedIn: true,
            handle: handle,
            token: token
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
                        <Card handle={this.state.handle} handleLogout={this.handleLogout}/>
                    </div>
                    <div className="center">
                        <Switch>
                            <Route exact path="/" render={() => {
                                return <Redirect to="/feed"/>}} />
                            <Route exact path="/connect" component={Connect}/>
                            <Route exact path="/explore" component={Explore}/>
                            <Route exact path="/messages" component={Messages}/>
                            <Route exact path="/profile" component={Profile}/>

                            <Route exact path="/feed" render={() =>
                                <Fragment>
                                    <Tweet token={this.state.token} />
                                    <Feed token={this.state.token} />
                                </Fragment>
                            }/>

                            <Route component={NotFound} />
                        </Switch>
                    </div>

                    <div className="rightSide">
                        <Search />
                        <News />
                        <FollowRecommendations />
                    </div>
                </div>
            );
        }
    }
}

export default App;
