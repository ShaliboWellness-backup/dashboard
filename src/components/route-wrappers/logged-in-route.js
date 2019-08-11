import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {propType} from 'graphql-anywhere';
import userFragment from '../../graphql/user/fragment/user';
import AuthPage from '../../pages/auth-page';
import axios from "axios";
import {CircularProgress} from "@material-ui/core";
import HomePage from "../../pages/home-page";
// import {isSignedIn} from "../../utils/auth-api";

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component renders the provided
 * the loginOverlay component on top of the current route.
 */


const LoggedInRoute = (props) => {

    const [state, setState] = React.useState({
        signedIn: false,
        loading: true
    });

    React.useEffect(() => {
        if (state.loading) {
            isSignedIn()

        }

    });

    const { NODE_ENV, REACT_APP_GRAPHQL_URI } = process.env;

    const isNotProduction = NODE_ENV !== 'production';
    const uri = isNotProduction ? 'http://localhost:3001/graphql' : REACT_APP_GRAPHQL_URI;

    async function isSignedIn() {
        await axios.get(uri, {
            withCredentials: true
        })
            .then(function (response) {
                let signedIn = !!response.data.name
                console.log(response);
                setState({signedIn, loading: false})
                return null
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    return (
        <Route
            path={props.path}
            render={(ownProps) => {
                // Otherwise, render the requested component
                if (state.loading) {
                    return <CircularProgress/>
                } else {
                    if (!state.signedIn) {
                        console.log(state.signedIn)
                        return <Redirect to={'/'}/>
                    }
                    console.log(state.signedIn)
                    return <HomePage/>;
                }
            }
            }
        />
    );
}

LoggedInRoute.propTypes = {
    curUser: propType(userFragment),
    component: PropTypes.func.isRequired,
};

LoggedInRoute.defaultProps = {
    curUser: null,
};

export default LoggedInRoute;
