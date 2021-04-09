import './App.css';
import Menu from './components/Menu.js'
import Tweet from './components/Tweet.js'
import Feed from './components/Feed.js'
import Search from './components/Search.js'
import News from './components/News.js'
import FollowRecommendations from './components/FollowRecommendations.js'

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
    );
}

export default App;
