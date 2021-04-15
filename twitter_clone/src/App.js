import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
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
import NotFound from './components/NotFound.js'
import FollowRecommendations from './components/FollowRecommendations.js'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './styles/App.css';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render() {
        return (
            <div className="App">
                <div className="leftSide">
                    <Menu />
                    <Card />
                </div>
                <div className="center">
                    <Router>
                        <Switch>
                            <Route exact path="/" render={() => {
                                return <Redirect to="/feed"/>}} />
                            <Route path="/connect" component={Connect}/>
                            <Route path="/explore" component={Explore}/>
                            <Route path="/messages" component={Messages}/>
                            <Route path="/profile" component={Profile}/>

                            <Route path="/feed" render={() =>
                                <Fragment>
                                    <Tweet />
                                    <Feed />
                                </Fragment>
                            }/>

                            <Route component={NotFound} />
                        </Switch>
                    </Router>
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

export default App;
