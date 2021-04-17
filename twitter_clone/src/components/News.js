import React, {Component} from 'react';
import '../styles/News.css';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }
    
    componentDidMount() {
        let articlesFromJSON = [];
        // This link searches for Twitter related articles from 2021 sorted by popularity
        fetch("https://newsapi.org/v2/everything?q=Twitter&from=2021&sortBy=popularity&apiKey=345c48473bcf47f98784d6cd773dd8fa")
            .then(response => response.json())
            .then(json => {
                if (json.status === "ok"){
                    for (let i = 0; i < 6; i++) {
                        let index = Math.floor(Math.random() * 10000);
                        // Make sure the same article doesn't appear twice
                        while (articlesFromJSON.includes(json.articles[index])) {
                            index = Math.floor(Math.random() * 10000);
                        }
                        articlesFromJSON.push(json.articles[index]);
                        
                    }
                } else {
                    console.error("JSON data could not be accessed")
                }
            });
            this.setState({articles: articlesFromJSON});
        console.log(articlesFromJSON);
    }

    render() {
        // const news = this.state.articles.map((article,index) => (
            // <div key={index} className={`row news-line`}>
            //     <a href={article.url}>{article.title}</a>
            //     <p>{"Article by: " + article.author + ", " + article.source.name}</p>
            // </div>
        // ));

        return(
            <div className={`news container`}>
                <div className={`col`}>
                    <div className={`row news-line`}>
                        <h3>News</h3>
                    </div>
                    <div>
                        {/* {news} */}
                        {/* <div className={`row news-line`}>
                            <a href={this.state.articles[1].url}>{this.state.articles[1].title}</a>
                            <p>{"Article by: " + this.state.articles[1].author + ", " + this.state.articles[1].source.name}</p>
                        </div> */}
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
