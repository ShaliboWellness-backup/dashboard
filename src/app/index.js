import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import client from '../graphql/apollo-client';
import scTheme from '../theme/sc';
import theme from '../theme/mui';
import Routes from '../routes';
import CurrentCompany from '../containers/CurrentCompany';
import CustomSnackbar from '../containers/CustomSnackbar';
import CurrentUser from '../containers/CurrentUser';

// Given that we are implementing App Shell Architecture and, therefore,
// injecting (via reactDOM.render) the Header and Main components into
// different HTML elements, we need a way to share the router 'history' among
// all two mentioned components.
// As a default, for every invocation of 'BrowserRouter', there will be new
// 'history' instance created. Then, changes in the 'history' object in one
// component won't be available in the other components. To prevent this, we are
// relying on 'Router' component instead of 'BrowserRouter' and defining our
// custom 'history' object by means of 'createBrowserHistory' function. Said
// 'history' object is then passed to every invocation of 'Router' and therefore
// the same 'history' object will be shared among all three mentioned components.
const history = createBrowserHistory();

const App = () => (
    <ThemeProvider theme={scTheme}>
        <Router history={history}>
            <ApolloProvider client={client}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <CurrentUser>
                        <CurrentCompany>
                            <CustomSnackbar>
                                <Routes />
                            </CustomSnackbar>
                        </CurrentCompany>
                    </CurrentUser>
                    {/* <GlobalDataProvider> */}
                    {/**/}
                    {/* </GlobalDataProvider> */}
                </MuiThemeProvider>
            </ApolloProvider>
        </Router>
    </ThemeProvider>
);

App.propTypes = {
    component: PropTypes.func.isRequired,
};

export default App;
