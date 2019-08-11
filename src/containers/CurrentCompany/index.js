import React, {Component} from "react"
import CurrentCompanyContext from "./CurrentCompanyContext"
import {companies} from "../../fakeData"

class CurrentCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCompany: null,
            handleSetCompany: this.handleSetCompany
        }
    }


    handleSetCompany = company => {
        this.setState({currentCompany: company})

    }

    render() {
        return (
            <CurrentCompanyContext.Provider
                value={
                    this.state
                }
            >
                {this.props.children}
            </CurrentCompanyContext.Provider>
        )
    }
}

export default CurrentCompany
