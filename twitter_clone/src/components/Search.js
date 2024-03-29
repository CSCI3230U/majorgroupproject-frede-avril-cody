import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import '../styles/Search.css';

// the search component, used to look up tweets by hashtag
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
        this.handleSearch = this.handleSearch.bind(this);
        this.getSubstring = this.getSubstring.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    }

    // handle a click in the search input
    handleClick() {
        this.searchInput.current.focus();
    }

    // handle the search input gaining focus
    handleFocus() {
        this.setState({focus: true});
    }

    // handle the search input losing focus
    handleBlur() {
        this.setState({focus: false});
    }

    // handle a click of the suggestions
    handleSuggestionClick() {
        this.props.updateFeed(this.state.results);
    }

    // query the db for the given hashtag (LIKE hashtag, not exact match)
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

    // updates feed when enter is pressed
    handleSearch(e) {
        if (e.code === "Enter") {
            this.props.updateFeed(this.state.results);
        }
    }

    // handles a change in the search input
    handleChange(event) {
        const query = event.target.value;
        this.setState({input: query});
        if (query.length > 0) {
            this.searchTwitter(query);
        } else {
            this.setState({results: []});
        }
    }

    // unimplemented, was gonna highlight the hashtag, not enough time
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

                    <input  type="search" name="search" placeholder="Search hashtags"
                            className="search-input" onBlur={this.handleBlur}
                            onFocus={this.handleFocus} ref={this.searchInput}
                            onChange={this.handleChange} value={this.state.input}
                            autoComplete="off" onKeyPress={this.handleSearch}/>
                </div>
                {this.state.focus &&
                <div className="search-suggestions">
                    {this.state.input === '' &&
                    <p className="search-prompt">Try searching for #hashtags</p>
                    }
                    {this.state.input !== '' && this.state.results.length === 0 &&
                    <p className="search-prompt">No results!</p>}
                    {this.state.input !== '' && this.state.results.length !== 0 &&
                    <ul onMouseDown={this.handleSuggestionClick} className="search-list">
                        {results}
                    </ul>}
                </div>}
            </>
        );
    };
}

export default Search;
