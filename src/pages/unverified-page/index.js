import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import background from '../../fakeData/Images/loginBg.jpg'
import {Paper} from '@material-ui/core'
import {withApollo} from "react-apollo";
import resendVerifyEmail from '../../graphql/user/mutation/resend-verify-email'
import {useApolloClient} from '@apollo/react-hooks'
import SnackbarContext from "../../containers/CustomSnackbar/SnackbarContext";

function MadeWithLove() {
    return (<div/>
        //   <Typography variant="body2" color="textSecondary" align="center">
        //      {'Built with love by the '}
        //    <Link color="inherit" to="https://material-ui.com/">
        //      Material-UI
        //</Link>
        //  {' team.'}
        //</Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16


    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    background: {
        position: 'absolute',
        width: "100%",
        height: '100vh',


    }
}));


const UnverifiedPage = (props) => {
    const classes = useStyles();

    const client = useApolloClient()

    const {openSnackbar} = React.useContext(SnackbarContext)

    return (
        <div style={{
            minHeight: "100vh",
            backgroundImage: `url("${background}")`,
            backgroundRepeat: 'none',
            backgroundSize: '100%',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
        }}>

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Verify Your Account
                    </Typography>

                    <Typography variant={"body1"} style={{marginTop: 10, textAlign: "center"}}>
                        It seems you haven't verified your account yet, A verification Email has been sent to you
                    </Typography>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            client.mutate({
                                mutation: resendVerifyEmail
                            })
                                .then(({data}) => {
                                    openSnackbar('success', "Email sent, please your inbox")
                                });
                        }}
                    >
                        Resend Email
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Typography color={'primary'} component={Link} to={'/'} variant={"body2"}>
                                {/*Already have an account? Sign in!*/}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Box mt={5}>
                    <MadeWithLove/>
                </Box>
            </Container>
        </div>
    );
};

export default withApollo(UnverifiedPage)
