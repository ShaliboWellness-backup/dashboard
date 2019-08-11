import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {propType} from 'graphql-anywhere';
import {withUser} from './global-data-provider';
import userFragment from './graphql/user/fragment/user';
import {ScrollToTop, LoggedInRoute} from './components/route-wrappers';
import HomePage from './pages/home-page';
import NotFoundPage from './pages/not-found-page';
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";

const Routes = props => (
    <ScrollToTop>
        <Switch>
            <LoggedInRoute path="/home" component={HomePage} {...props} />
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/signup" component={SignupPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </ScrollToTop>
);

Routes.propTypes = {
    curUser: propType(userFragment), // eslint-disable-line
};

Routes.defaultProps = {
    curUser: null,
};

export default withUser(Routes);
