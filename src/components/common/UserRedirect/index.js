import React from 'react';
import logo from "../../../Assets/logo-white.png";
import {Button, Link, Typography} from "@material-ui/core";
import {withApollo} from "react-apollo";


function UserRedirect(props) {
    return (
        <div style={{
            width: '100%',
            height: "100vh",
            backgroundColor: "#75D6B2",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <img style={{width: 300, height: 300, marginBottom: 16}} src={logo}/>
            <Typography gutterBottom variant={"h4"} style={{color: "white"}}> Please use our
                mobile
                app.
            </Typography>
            <Typography component={Link} href={'https://play.google.com/store/apps'}
                        gutterBottom
                        variant={"h4"} style={{color: "white", cursor: 'pointer'}}>Dont have it?
                Click here
            </Typography>
            <Button style={{
                color: 'white',
                position: 'absolute',
                top: 32,
                left: 32,
            }}
                    variant={"outlined"}
                    color={'inherit'}
                    onClick={async () => {
                        await localStorage.removeItem('x-auth-token');
                        props.client.resetStore()
                    }}> Return to Login Page</Button>


        </div>);
}

export default withApollo(UserRedirect);
