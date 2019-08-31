import React from 'react';
import WelcomePage from "../home-page/WelcomePage";
import {Button} from "@material-ui/core";
import {withApollo} from "react-apollo";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme'
import CurrentUserContext from "../../containers/CurrentUser/CurrentUserContext";


function TrainersPage(props) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    let userContext = React.useContext(CurrentUserContext)


    React.useEffect(() => {
        userContext.handleSetUser(props.user)
    }, [props.user])

    return (
        <div style={{padding: isMobile ? '16px 16px' : "64px 64px"}}>
            <WelcomePage user={props.user}/>
            <Button style={{
                position: 'absolute',
                top: 18,
                left: isMobile ? 24 : 56,
            }}
                    color="textPrimary"
                    onClick={async () => {
                        await localStorage.removeItem('x-auth-token');
                        props.client.resetStore()
                    }}>Logout</Button>
        </div>
    );
}

export default withApollo(TrainersPage);
