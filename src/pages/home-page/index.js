import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CircularProgress, Grid} from '@material-ui/core';
import {Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import Members from './Members';
import Promotions from './Promotions';
import Events from './Events';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import WelcomePage from './WelcomePage';
import HeaderTitle from "../../components/header-title";
import {Query} from "react-apollo";
import getEventsQuery from "../../graphql/event/query/event";
import getPromotionsQuery from "../../graphql/promotion/query/promotion";
import Trainers from "./Trainers";


class HomePage extends Component {
    render() {
        const {currentCompany} = this.context;
        console.log(currentCompany)

        return (
            <React.Fragment>
                <HeaderTitle/>
                <div style={{marginBottom: 30}}>

                    <Sidebar/>
                    <div style={{marginLeft: 280, marginRight: 30}}>
                        <Switch>
                            <Route exact path="/home"
                                   render={props => <WelcomePage {...props} company={currentCompany}/>}/>
                            <Route exact path="/home/trainers"
                                   render={props => <Trainers {...props} company={currentCompany}/>}/>
                            <Route exact path="/home/members"
                                   render={props => <Members {...props} company={currentCompany}/>}/>
                            <Route path="/home/promotions"
                                   render={props => (
                                       <Query query={getPromotionsQuery}>
                                           {({loading, error, data}) => {
                                               let promotions = []
                                               if (loading) {
                                                   return <div style={{width: "100%", textAlign: "center"}}>
                                                       <CircularProgress/>
                                                   </div>
                                               }
                                               if (error) {
                                                   console.log(error)
                                                   return null
                                               }
                                               if (!loading && data.promotions) {
                                                   let {promotions} = data
                                                   if (data) {
                                                       console.log(promotions)
                                                       return <Promotions {...props} promotions={promotions}/>
                                                   }

                                               }
                                           }
                                           }
                                       </Query>
                                   )
                                   }/>
                            <Route path="/home/events"
                                   render={props => <Query query={getEventsQuery}>
                                       {({loading, error, data}) => {
                                           if (loading) {

                                               return null
                                           } else {
                                               let {events} = data
                                               return (
                                                   <Events  {...props} events={events}/>
                                               )
                                           }


                                       }
                                       }
                                   </Query>}
                            />
                            {/* <Route path="/statistics" component={Statistics}/> */}
                        </Switch>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

HomePage.contextType = CurrentCompanyContext;
export default HomePage;
