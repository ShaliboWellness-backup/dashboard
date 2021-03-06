import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import Sidebar from '../../components/header-title/Sidebar';
import Members from './Members';
import Promotions from './Promotions';
import Events from './Events';
import Teams from './Teams';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import WelcomePage from './WelcomePage';
import HeaderTitle from '../../components/header-title';
import Trainers from './Trainers';
import getCompanyEventsQuery from '../../graphql/companies/query/get-events';
import getCompanyPromotionsQuery from '../../graphql/companies/query/get-promotions';
import AllUsers from './AllUsers';
import trainersQuery from '../../graphql/user/query/trainers';
import CurrentUserContext from '../../containers/CurrentUser/CurrentUserContext';
import EventMaker from './EventMaker';
import getPromotionsQuery from '../../graphql/promotion/query/promotion';
import companyTeamsQuery from '../../graphql/teams/query/companyTeam';
import EventsCompleted from './EventsCompleted';

const R = require('ramda');

const HomePage = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const value = React.useContext(CurrentCompanyContext);
  const { currentCompany } = value;
  const { user } = props;
  const userContext = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  React.useEffect(() => {
    userContext.handleSetUser(props.user);
  }, [props.user]);
  return (
    <>
      <HeaderTitle currentPath={props.location.pathname} />
      <div style={{ marginBottom: 30 }}>
        <div style={{
          marginLeft: isMobile ? theme.spacing(1) : 280,
          marginRight: isMobile ? theme.spacing(1) : theme.spacing(4),
        }}
        >
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                currentCompany ?
                  <WelcomePage
                    {...props}
                    user={user}
                    company={currentCompany}
                  /> : <CircularProgress />
              )}
            />
            <Route
              exact
              path="/trainers"
              render={(props) => (
                <Query query={trainersQuery} pollInterval={1000}>
                  {({ loading, error, data }) => {
                    const users = [];
                    if (loading) {
                      return (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <CircularProgress />
                        </div>
                      );
                    }
                    if (error) {
                      console.log(error);
                      return null;
                    }
                    if (!loading && data.trainers) {
                      const { trainers } = data;
                      return <Trainers {...props} users={trainers} />;
                    }
                  }}
                </Query>
              )}
            />
            <Route exact path="/all-users" render={(props) => <AllUsers {...props} />} />
            <Route
              exact
              path="/members"
              render={(props) => <Members {...props} company={currentCompany} />}
            />
            <Route
              path="/promotions"
              render={(props) => (
                <Query
                  query={getPromotionsQuery}
                  pollInterval={500}
                >
                  {({ loading, error, data }) => {
                    const promotions = [];
                    if (loading) {
                      return (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <CircularProgress />
                        </div>
                      );
                    }
                    if (error) {
                      console.log(error);
                      return null;
                    }
                    if (!loading && !!data && !!data.promotions) {
                      const { promotions } = data;
                      return <Promotions {...props} promotions={promotions} />;
                    }
                  }}
                </Query>
              )}
            />
            <Route
              path="/all-promotions"
              render={(props) => (
                <Query
                  query={getPromotionsQuery}
                  pollInterval={500}
                >
                  {({ loading, error, data }) => {
                    const promotions = [];
                    if (loading) {
                      return (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <CircularProgress />
                        </div>
                      );
                    }
                    if (error) {
                      console.log(error);
                      return null;
                    }
                    if (!loading && !!data && !!data.promotions) {
                      const { promotions } = data;
                      return <Promotions {...props} promotions={promotions} edit />;
                    }
                  }}
                </Query>
              )}
            />
            <Route
              path="/events"
              render={(props) => (
                currentCompany ?
                  <Query
                    query={getCompanyEventsQuery}
                    variables={{ _id: currentCompany._id }}
                    pollInterval={500}
                  >
                    {({ loading, error, data }) => {
                      if (loading) {
                        return (
                          <div style={{ width: '100%', textAlign: 'center' }}>
                            <CircularProgress />
                          </div>
                        );
                      }
                      if (error) {
                        console.log(error);
                        return null;
                      }
                      if (!loading && data && data.company && data.company.events) {
                        const events = R.pathOr([], ['events'])(data.company);
                        if (data) {
                          return <Events {...props} events={events} />;
                        }
                      }
                    }}
                  </Query> :
                  <CircularProgress />
              )}
            />
            <Route
              path="/events-completed"
              render={(props) => (
                <Query
                  query={getCompanyEventsQuery}
                  variables={currentCompany ? { _id: currentCompany._id } : { _id: 'null' }}
                  pollInterval={500}
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <CircularProgress />
                        </div>
                      );
                    }
                    if (error) {
                      console.log(error);
                      return null;
                    }
                    if (!loading && data && data.company && data.company.events) {
                      const events = R.pathOr([], ['events'])(data.company);
                      if (data) {
                        return <EventsCompleted {...props} disableCreateEvent events={events} />;
                      }
                    }
                  }}
                </Query>
              )}
            />
            <Route path="/event-maker" component={EventMaker} />
            <Route
              path="/teams"
              render={(props) => (
                <Query
                  query={companyTeamsQuery}
                  variables={currentCompany ? { companyId: currentCompany._id } : { companyId: 'null' }}
                  pollInterval={5000}
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <CircularProgress />
                        </div>
                      );
                    }
                    if (error) {
                      console.log(error);
                      return null;
                    }
                    if (!loading && data && data.companyTeams) {
                      const teams = data.companyTeams;
                      if (data) {
                        return <Teams {...props} disableCreateEvent teams={teams} currentCompany={currentCompany} />;
                      }
                    }
                  }}
                </Query>
              )}
            />
          </Switch>
        </div>

      </div>
    </>
  );
};

export default HomePage;
