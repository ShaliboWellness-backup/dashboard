import React from 'react';
import WelcomePage from "../home-page/WelcomePage";
import {Button} from "@material-ui/core";
import {withApollo} from "react-apollo";


function TrainersPage(props) {
    return (
        <div style={{padding: "64px 64px"}}>
            <WelcomePage/>
            <Button style={{
                position: 'absolute',
                top: 18,
                left: 36,
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
