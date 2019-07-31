import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import {Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import Members from './Members';
import Promotions from './Promotions';
import Events from './Events';
import Statistics from './Statistics';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import WelcomePage from './WelcomePage';

class HomePage extends Component {
    render() {
        const {currentCompany} = this.context;
                
        console.log(currentCompany);
        return (
            <div style={{margin: '16px 16px'}}>

                <Sidebar/>
                <div style={{marginLeft: 280, marginRight: 30}}>
                    <Switch>
                        <Route exact path="/" render={props => <WelcomePage {...props} company={currentCompany}/>}/>
                        <Route path="/members" render={props => <Members {...props} company={currentCompany}/>}/>
                        <Route
                            path="/promotions"
                            render={props => <Promotions {...props} company={currentCompany}/>}
                        />
                        <Route path="/events" render={props => <Events {...props} events={currentCompany.events}/>}/>
                        {/* <Route path="/statistics" component={Statistics}/> */}
                    </Switch>
                </div>

            </div>
        );
    }
}

HomePage.contextType = CurrentCompanyContext;
export default HomePage;
