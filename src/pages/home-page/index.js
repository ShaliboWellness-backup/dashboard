import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import Sidebar from './Sidebar/Sidebar'
import {Switch, Route} from "react-router-dom";
import Members from "./Members"
import Promotions from "./Promotions"
import Events from "./Events"
import Statistics from "./Statistics"
import CurrentCompanyContext from "../../containers/CurrentCompany/CurrentCompanyContext";
import Stats from "./Stats"

class HomePage extends Component {
    render() {
        const {currentCompany} = this.context

        console.log(currentCompany)
        return (
            <div style={{margin: "16px 16px"}}>

                       <Sidebar />
                    <div style={{marginLeft: 250,}}>
                        <Switch>
                            <Route exact path="/" render={(props)=> <Stats {...props} company={currentCompany}/>}/>
                            <Route path="/members" render={(props)=> <Members {...props} company={currentCompany}/>}/>
                            <Route path="/promotions" render={(props)=> <Promotions {...props} company={currentCompany}/>} />
                            <Route path="/events" render={(props)=> <Events {...props} events={currentCompany.events} />}/>
                            {/*<Route path="/statistics" component={Statistics}/>*/}
                        </Switch>
                    </div>

            </div>
        );
    }
}

HomePage.contextType = CurrentCompanyContext
export default HomePage;
