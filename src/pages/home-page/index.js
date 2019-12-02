import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {Route, Switch} from 'react-router-dom';
import Sidebar from '../../components/header-title/Sidebar';
import Members from './Members';
import Promotions from './Promotions';
import Events from './Events';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import WelcomePage from './WelcomePage';
import HeaderTitle from "../../components/header-title";
import {Query} from "react-apollo";
import Trainers from "./Trainers";
import getCompanyEventsQuery from "../../graphql/companies/query/get-events";
import getCompanyPromotionsQuery from "../../graphql/companies/query/get-promotions";
import AllUsers from "./AllUsers";
import usersQuery from "../../graphql/user/query/users";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme'
import CurrentUserContext from "../../containers/CurrentUser/CurrentUserContext";
import EventMaker from './EventMaker'
import getPromotionsQuery from "../../graphql/promotion/query/promotion";
import EventsCompleted from "./EventsCompleted";

const R = require("ramda")


const HomePage = (props) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const value = React.useContext(CurrentCompanyContext)
    const {currentCompany} = value;
    const {user} = props
    let userContext = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        userContext.handleSetUser(props.user)
    }, [props.user])
    return (
        <React.Fragment>
            <HeaderTitle currentPath={props.location.pathname}/>
            <div style={{marginBottom: 30}}>
                <div style={{
                    marginLeft: isMobile ? theme.spacing(1) : 280,
                    marginRight: isMobile ? theme.spacing(1) : theme.spacing(4)
                }}>
                    <Switch>
                        <Route exact path="/"
                               render={props => <WelcomePage {...props} user={user}
                                                             company={currentCompany}/>}/>
                        <Route exact path="/trainers"
                               render={props => <Query query={usersQuery} pollInterval={500}>
                                   {({loading, error, data}) => {
                                       let users = []
                                       if (loading) {
                                           return <div style={{width: "100%", textAlign: "center"}}>
                                               <CircularProgress/>
                                           </div>
                                       }
                                       if (error) {
                                           console.log(error)
                                           return null
                                       }
                                       if (!loading && data.users) {
                                           let {users} = data
                                           return <Trainers {...props} users={users}/>
                                       }
                                   }
                                   }
                               </Query>}/>
                        <Route exact path="/all-users" render={props => <AllUsers {...props}/>}/>
                        <Route exact path="/members"
                               render={props => <Members {...props} company={currentCompany}/>}/>
                        <Route path="/promotions"
                               render={props => (
                                   <Query query={getPromotionsQuery}
                                          pollInterval={500}>
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
                                           if (!loading && !!data && !!data.promotions) {
                                               let {promotions} = data
                                               return <Promotions {...props} promotions={promotions}/>

                                           }
                                       }
                                       }
                                   </Query>
                               )}
                        />
                        <Route path="/all-promotions"
                               render={props => (
                                   <Query query={getPromotionsQuery}
                                          pollInterval={500}>
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
                                           if (!loading && !!data && !!data.promotions) {
                                               let {promotions} = data
                                               return <Promotions {...props} promotions={promotions} edit={true}/>

                                           }
                                       }
                                       }
                                   </Query>
                               )}
                        />
                        <Route path="/events"
                               render={props =>
                                   <Query query={getCompanyEventsQuery}
                                          variables={currentCompany ? {_id: currentCompany._id} : {_id: "null"}}
                                          pollInterval={500}>
                                       {({loading, error, data}) => {
                                           if (loading) {
                                               return <div style={{width: "100%", textAlign: "center"}}>
                                                   <CircularProgress/>
                                               </div>
                                           }
                                           if (error) {
                                               console.log(error)
                                               return null
                                           }
                                           if (!loading && data && data.company && data.company.events) {
                                               let events = R.pathOr([], ['events'])(data.company)
                                               if (data) {

                                                   return <Events {...props} events={events}/>
                                               }

                                           }
                                       }
                                       }
                                   </Query>}
                        />
                        <Route path="/events-completed"
                               render={props =>
                                   <Query query={getCompanyEventsQuery}
                                          variables={currentCompany ? {_id: currentCompany._id} : {_id: "null"}}
                                          pollInterval={500}>
                                       {({loading, error, data}) => {
                                           if (loading) {
                                               return <div style={{width: "100%", textAlign: "center"}}>
                                                   <CircularProgress/>
                                               </div>
                                           }
                                           if (error) {
                                               console.log(error)
                                               return null
                                           }
                                           if (!loading && data && data.company && data.company.events) {
                                               let events = R.pathOr([], ['events'])(data.company)
                                               if (data) {
                                                   return <EventsCompleted {...props} disableCreateEvent={true} events={events}/>
                                               }
                                           }
                                       }
                                       }
                                   </Query>}
                        />
                        <Route path="/event-maker" component={EventMaker}/>
                    </Switch>
                </div>

            </div>
        </React.Fragment>
    );
}

export default HomePage;
