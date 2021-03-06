import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { Query } from '@apollo/client/react/components';
import HomePage from '../../pages/home-page';
import userQuery from '../../graphql/user/query/user';
import TrainersPage from '../../pages/trainers-page';
import UserRedirect from '../common/UserRedirect';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component renders the provided
 * the loginOverlay component on top of the current route.
 */

const LoggedInRoute = (props) => (
  <Route
    path={props.path}
    render={(ownProps) => (
      <Query query={userQuery}>
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
            return <Redirect to="/login" />;
          }
          if (!loading && !!data.user) {
            if (data.user.roles.includes('admin')) {
              return <HomePage {...ownProps} user={data.user} />;
            }
            if (data.user.roles.includes('trainer')) {
              return <TrainersPage user={data.user} />;
            }
            return <UserRedirect />;
          }
          return <Redirect to="/login" />;
        }}
      </Query>
    )}
  />
);

export default LoggedInRoute;
