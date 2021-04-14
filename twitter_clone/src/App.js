import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/Menu.js'
import Tweet from './components/Tweet.js'
import Feed from './components/Feed.js'
import Search from './components/Search.js'
import News from './components/News.js'
import FollowRecommendations from './components/FollowRecommendations.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
        } 
    }
    render(){
        return (
            <div className="App">
                <div className="leftSide">
                    <Menu />
                </div>
                <div className="center">
                    <Router>
                        <Switch>
                            <Route exact path="/" render={() => {}}/> 
                            <Route path="/News" component={News}/>
                            <Route path="/Feed" render={() => "hello feed"}/>
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
