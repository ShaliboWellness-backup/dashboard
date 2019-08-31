import React, {Component} from "react"
import CurrentUserContext from "./CurrentUserContext"

class CurrentUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            handleSetUser: this.handleSetUser
        }
    }


    handleSetUser = user => {
        if (user != null) {
            this.setState({currentUser: user});
        }
    }

    render() {
        return (
            <CurrentUserContext.Provider
                value={
                    this.state
                }
            >
                {this.props.children}
            </CurrentUserContext.Provider>
        )
    }
}

export default CurrentUser
