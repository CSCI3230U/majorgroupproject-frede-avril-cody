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
       
        // <Router>
        //     <div className="App">
        //         <Switch>
        //         <Route exact path="/" render={() => (<Menu />)}/>
        //         <Route exact path="/feed" render={() => (<Feed />)}/>
        //         </Switch> 
        //     </div> 
        // </Router>
    );
}

export default App;
