import React, {Component} from 'react';
import '../styles/News.css';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: [],
            articles: [],
            topics :["Twitter", "Facebook", "News", "Canada", "Entertainment"],
        };
        this.newsArticles = [];
    }
    
    componentDidMount() {
        let topicIndex = Math.floor(Math.random() * this.state.topics.length);
        // This link searches for Twitter related articles from 2021 sorted by popularity
        fetch(`https://newsapi.org/v2/everything?q=${this.state.topics[topicIndex]}&from=2021&sortBy=popularity&apiKey=345c48473bcf47f98784d6cd773dd8fa`)
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

    render() { 
        const news = this.state.articles.map((article,index) => (
            <div key={index} className={`row news-line`}>
                <a target="_blank" href={article.url}>{article.title}</a>
                <p>{"Article by: " + article.author + ", " + article.source.name}</p>
            </div>
        ));

        return(
            <div className={`news container`}>
                <div className={`col`}>
                    <div className={`row news-line`}>
                        <h3>News</h3>
                    </div>
                    <div className={`news-articles`}>
                        {news}
                    </div>
                    <div className={`row news-footer`}>
                        <a className={`news-a`}>Show more</a>
                    </div>
                </div>
            </div>
        );
    };
}

export default News;
