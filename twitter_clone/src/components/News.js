import React, {Component} from 'react';
import '../styles/News.css';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: [],
            articles: [],
            loaded: false,
        };
        this.showMore = this.showMore.bind(this);
    }
    
    componentDidMount() {
        // get topics to filter JSON
        let topics = ["Twitter", "Facebook", "News", "Canada", "Work"]
        let topicIndex = Math.floor(Math.random() * topics.length);

        // get date to filter JSON so results are up to date
        let today = new Date();
        let todayS = today.getFullYear() +'-'+ String(today.getMonth() + 1) +'-'+ String(today.getDate());

        // This link searches for *topic* related articles from today sorted by popularity
        fetch(`https://newsapi.org/v2/everything?q=${topics[topicIndex]}&from=${todayS}&sortBy=popularity&apiKey=345c48473bcf47f98784d6cd773dd8fa`)
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

        this.setState({loaded: true});
            
    }

    showMore(){
        // get topics to filter JSON
        let topics = ["Cooking", "Health", "Finance", "Motivation"]
        let topicIndex = Math.floor(Math.random() * topics.length);

        // get date to filter JSON so results are up to date
        let today = new Date();
        let todayS = today.getFullYear() +'-'+ String(today.getMonth() + 1) +'-'+ String(today.getDate());

        // This link searches for *topic* related articles from today sorted by popularity
        fetch(`https://newsapi.org/v2/everything?q=${topics[topicIndex]}&from=${todayS}&sortBy=popularity&apiKey=345c48473bcf47f98784d6cd773dd8fa`)
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
                <p>{article.author}</p>
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
                        <a className={`news-showMore`} onClick={this.showMore}>Show more</a>
                    </div>
                </div>
            </div>
        );
    };
}

export default News;
