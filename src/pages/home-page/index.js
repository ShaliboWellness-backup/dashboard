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


const HomePage = (props) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const value = React.useContext(CurrentCompanyContext)
    const {currentCompany} = value;
    const {user} = props


    return (
        <React.Fragment>
            <HeaderTitle/>
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
                               render={props => <Query query={usersQuery}>
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
                        <Route exact path="/all-users"
                               render={props => <Query query={usersQuery}>
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
                                           return <AllUsers {...props} users={users}/>
                                       }
                                   }
                                   }
                               </Query>}/>
                        <Route exact path="/members"
                               render={props => <Members {...props} company={currentCompany}/>}/>
                        <Route path="/promotions"
                               render={props => (
                                   <Query query={getCompanyPromotionsQuery}
                                          variables={currentCompany ? {_id: currentCompany._id} : {_id: "null"}}
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
                                           if (!loading && data.company.promotions) {
                                               let {promotions} = data.company
                                               if (data) {
                                                   console.log(promotions)
                                                   return <Promotions {...props} promotions={promotions}/>
                                               }

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
                                           let events = []
                                           if (loading) {
                                               return <div style={{width: "100%", textAlign: "center"}}>
                                                   <CircularProgress/>
                                               </div>
                                           }
                                           if (error) {
                                               console.log(error)
                                               return null
                                           }
                                           if (!loading && data.company.events) {
                                               let {events} = data.company
                                               if (data) {

                                                   return <Events {...props} events={events}/>
                                               }

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

export default HomePage;
