import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { withApollo } from '@apollo/client/react/hoc';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import WelcomePage from '../home-page/WelcomePage';
import CurrentUserContext from '../../containers/CurrentUser/CurrentUserContext';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import getCompanyQuery from '../../graphql/companies/query/get-company'
import { useApolloClient } from '@apollo/client';


function TrainersPage(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const userContext = React.useContext(CurrentUserContext);
  const { currentCompany, handleSetCompany } = React.useContext(CurrentCompanyContext);
  const client = useApolloClient();

  useEffect(() => {
    userContext.handleSetUser(props.user);

    console.log({ user: props.user })

    if (!props.user) return;

    try {
      client.query({
        query: getCompanyQuery,
        variables: {
          _id: props.user.company._id
        }
      })
        .then(resp => {
          console.log({ resp })
          handleSetCompany(resp.data.company);
        })
        .catch(err => {
          console.log('GraphQL error', err, { getCompanyQuery, vars: { id: props.user.company._id } })
        })
    } catch (err) {
      console.log('GraphQL error', err, { getCompanyQuery, vars: { id: props.user.company._id } })
    }

  }, [props.user]);

  return (
    <div style={{ padding: isMobile ? '16px 16px' : '64px 64px' }}>
      <WelcomePage
        user={props.user}
        company={currentCompany} />
      <Button
        style={{
          position: 'absolute',
          top: 18,
          left: isMobile ? 24 : 56,
        }}
        color="textPrimary"
        onClick={async () => {
          await localStorage.removeItem('x-auth-token');
          props.client.resetStore();
        }}
      >Logout
      </Button>
    </div>
  );
}

export default withApollo(TrainersPage);
