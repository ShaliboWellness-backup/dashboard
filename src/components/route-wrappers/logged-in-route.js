import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';
import {propType} from 'graphql-anywhere';
import userFragment from '../../graphql/user/fragment/user';
import {CircularProgress} from "@material-ui/core";
import HomePage from "../../pages/home-page";
import {Query} from "react-apollo";
import userQuery from "../../graphql/user/query/user";
import TrainersPage from "../../pages/trainers-page";
import UserRedirect from "../common/UserRedirect";
import CurrentUserContext from '../../containers/CurrentUser/CurrentUserContext'


//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component renders the provided
 * the loginOverlay component on top of the current route.
 */


const LoggedInRoute = (props) => {


    return (
        <Route
            path={props.path}
            render={(ownProps) => {
                return <Query query={userQuery}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <div style={{width: "100%", textAlign: "center"}}>
                                <CircularProgress/>
                            </div>
                        }
                        if (error) {
                            console.log(error)
                            return <Redirect to={"/login"}/>
                        }
                        if (!loading && !!data.user) {
                            console.log(data)
                            if (data.user.roles.includes('admin')) {
                                return <HomePage user={data.user}/>
                            }
                            if (data.user.roles.includes('trainer')) {
                                return <TrainersPage user={data.user}/>
                            } else {
                                return <UserRedirect/>
                            }

                        } else {
                            return <Redirect to={"/login"}/>
                        }
                    }
                    }
                </Query>
            }
            }
        />)
}

LoggedInRoute.propTypes = {
    curUser: propType(userFragment),
    component: PropTypes.func.isRequired,
};

LoggedInRoute.defaultProps = {
    curUser: null,
};

export default LoggedInRoute;
