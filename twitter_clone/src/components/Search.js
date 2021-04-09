import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

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

    handleChange(event) {
        this.setState({input: event.target.value});
        // note - setState is asynch, this is 1 behind - can use e.target.value though
        console.log(this.state.input);
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
