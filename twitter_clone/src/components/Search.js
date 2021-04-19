import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import '../styles/Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            input: ''
        }
        this.searchInput = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                console.log(res);
                
            });
    }

    handleChange(event) {
        const query = event.target.value;
        this.setState({input: query});
        if (query.length > 2) {
            this.searchTwitter(query);
        }
    }

    /* TODO decide if the search suggestions dropdown warrants a separate component
    - decide based on props/state management */

    render() {
        return(
            <>
                <div    className={`rounded-pill search-container
                        ${this.state.focus ? "search-container-focused" : "" }`}
                        onClick={this.handleClick}>

                    <FontAwesomeIcon className="search-icon" icon={faSearch} size="1x" />

                    <input  type="search" name="search" placeholder="Search Twitter"
                            className="search-input" onBlur={this.handleBlur}
                            onFocus={this.handleFocus} ref={this.searchInput}
                            onChange={this.handleChange} value={this.state.input} />
                </div>
                {this.state.focus &&
                <div className="search-suggestions">
                    {this.state.input === '' &&
                    <p className="search-prompt">Try searching for people,
                        topics, or keywords</p>
                    }
                    {this.state.input !== '' &&
                    <ul className="search-list">
                        <li>Placeholder 1</li>
                        <li>Placeholder 2</li>
                        <li>Placeholder 3</li>
                    </ul>}
                </div>}
            </>
        );
    };
}

export default Search;
