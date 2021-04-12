import './styles/App.css';
import Menu from './components/Menu.js'
import Tweet from './components/Tweet.js'
import Feed from './components/Feed.js'
import Search from './components/Search.js'
import News from './components/News.js'
import FollowRecommendations from './components/FollowRecommendations.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                <Route exact path="/" render={() => (<Menu />)}/>
                <Route exact path="/news" render={() => (<News />)}/>
                </Switch>   
            </Router>
            <div className="leftSide">
                <Menu />
            </div>
            <div className="center">
                <Tweet />
                <Feed />
            </div>
            <div className="rightSide">
                <Search />
                <News />
                <FollowRecommendations />
            </div>
        </div>
       
        
    );
}

export default App;
