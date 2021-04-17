import React, {Component} from 'react';
import '../styles/News.css';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: [],
            articles: [],
            topics:[],
        };
        this.newsArticles = [];
    }
    
    componentDidMount() {
        let topics = ["Twitter", "Facebook", "News", "Canada", "Entertainment"]
        let topicIndex = Math.floor(Math.random() * topics.length);
        this.setState({topics: topics[topicIndex]})
        // This link searches for Twitter related articles from 2021 sorted by popularity
        fetch(`https://newsapi.org/v2/everything?q=${topics[topicIndex]}&from=2021&sortBy=popularity&apiKey=345c48473bcf47f98784d6cd773dd8fa`)
            .then(response => response.json())
            .then(json => {
                let selectedArticles = [];

                if (json.status === "ok"){
                    this.setState({json: json.articles})
                    let i = 0;
                    this.state.json.forEach(article => {
                        if (i < 5){
                            selectedArticles.push(article);
                        }
                        i++;
                    });

                    this.setState({articles: selectedArticles});
                } else {
                    console.error("JSON data could not be accessed")
                }
            });
            
    }

    showMore(){
        let topics = ["Cooking", "Health", "Finance", "Motivation"]
        let topicIndex = Math.floor(Math.random() * topics.length);
        this.setState({topics: topics[topicIndex]})
        // This link searches for Twitter related articles from 2021 sorted by popularity
        fetch(`https://newsapi.org/v2/everything?q=${topics[topicIndex]}&from=2021&sortBy=popularity&apiKey=345c48473bcf47f98784d6cd773dd8fa`)
            .then(response => response.json())
            .then(json => {
                let selectedArticles = this.state.articles;

                if (json.status === "ok"){
                    this.setState({json: json.articles})
                    let i = 0;
                    this.state.json.forEach(article => {
                        if (i < 5){
                            selectedArticles.push(article);
                        }
                        i++;
                    });

                    this.setState({articles: selectedArticles});
                } else {
                    console.error("JSON data could not be accessed")
                }
            });
    }

    render() { 
        const news = this.state.articles.map((article,index) => (
            <div key={index} className={`row news-line news-side-padding`}>
                <a className={`news-a`} target="_blank" href={article.url}>{article.title}</a>
                <p>{article.source.name}</p>
            </div>
        ));

        return(
            <div className={`news container`}>
                <div className={``}>
                    <div className={`row news-line news-side-padding`}>
                        <h3>News</h3>
                    </div>
                    <div className={`news-articles`}>
                        {news}
                    </div>
                    <div className={`row news-footer news-side-padding`}>
                        <a className={`news-showMore`}>Show more</a>
                    </div>
                </div>
            </div>
        );
    };
}

export default News;
