import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import '../styles/Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            input: '',
            results: []
        }
        this.searchInput = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSubstring = this.getSubstring.bind(this);
    }

    handleClick() {
        this.searchInput.current.focus();
    }

    handleFocus() {
        this.setState({focus: true});
    }

    handleBlur() {
        this.setState({focus: false});
    }

    searchTwitter(query) {
        const params = {
            query: query
        };
        if (!params.query) {
            return;
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        fetch("http://localhost:4000/searchTwitter", options)
            .then(res => res.json())
            .then(res => {
                this.setState({results: res});
            });
    }

    handleChange(event) {
        const query = event.target.value;
        this.setState({input: query});
        if (query.length > 2) {
            this.searchTwitter(query);
        } else {
            this.setState({results: []});
        }
    }

    getSubstring(tweet) {
        return tweet;
    }

    render() {
        const results = this.state.results.map(tweet => (
            <li key={tweet.rowid}>
                {this.getSubstring(tweet.message)}
            </li>
        ));
        if (results.length > 5) {
            results.length = 5;
        }
        return(
            <>
                <div    className={`rounded-pill search-container
                        ${this.state.focus ? "search-container-focused" : "" }`}
                        onClick={this.handleClick}>

                    <FontAwesomeIcon className="search-icon" icon={faSearch} size="1x" />

                    <input  type="search" name="search" placeholder="Search Twitter"
                            className="search-input" onBlur={this.handleBlur}
                            onFocus={this.handleFocus} ref={this.searchInput}
                            onChange={this.handleChange} value={this.state.input}
                            autoComplete="off" />
                </div>
                {this.state.focus &&
                <div className="search-suggestions">
                    {this.state.input === '' &&
                    <p className="search-prompt">Try searching for #hashtags</p>
                    }
                    {this.state.input !== '' && this.state.results.length === 0 &&
                    <p className="search-prompt">Exact matches only</p>}
                    {this.state.input !== '' && this.state.results.length !== 0 &&
                    <ul className="search-list">
                    {/* // if enter or click, go to #explore which displays all results */}
                        {results}
                    </ul>}
                </div>}
            </>
        );
    };
}

export default Search;
