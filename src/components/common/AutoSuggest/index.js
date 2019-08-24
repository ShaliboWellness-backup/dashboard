import React from 'react';
import Autosuggest from 'react-autosuggest';

var users = [];
var selectedUser = null;
var onSelected = null;

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? users : users.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
    selectedUser = suggestion;
    if (onSelected != null) onSelected(selectedUser);
    return suggestion.name;
};

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class UserPicker extends React.Component {
    constructor(props) {
        super(props);

        users = props.users;
        onSelected = props.onSelected;

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: []
        };
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        users = nextProps.users
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Add User',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                theme={styles}
                alwaysRenderSuggestions={true}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default UserPicker

const styles = {
    container: {
        position: "relative"
    },
    input: {
        width: "280px",
        height: "52px",
        padding: "10px 20px",
        fontFamily: "Helvetica, sans-serif",
        fontWeight: "300",
        fontSize: "16px",
        border: "1px solid #aaa",
        borderRadius: "4px"
    },
    inputFocused: {
        outline: "none"
    },
    inputOpen: {
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0"
    },
    suggestionsContainer: {
        display: "none"
    },
    suggestionsContainerOpen: {
        display: "block",
        position: "absolute",
        top: "51px",
        width: "280px",
        border: "1px solid #aaa",
        backgroundColor: "#fff",
        fontFamily: "Helvetica, sans-serif",
        fontWeight: "300",
        fontSize: "16px",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        zIndex: "2"
    },
    suggestionsList: {
        margin: "0",
        padding: "0",
        listStyleType: "none"
    },
    suggestion: {
        cursor: "pointer",
        padding: "10px 20px"
    },
    suggestionHighlighted: {
        backgroundColor: "#ddd"
    }
};