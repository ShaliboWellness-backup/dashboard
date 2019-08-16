import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import background from '../../fakeData/Images/loginBg.jpg'
import {Paper} from '@material-ui/core'
import {handleSignup} from "../../utils/auth-api";
import loginMutation from "../../graphql/login";
import signupMutation from "../../graphql/signup";
import {Mutation} from "react-apollo";
import {withApollo} from "react-apollo";

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


const SignupPage = (props) => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
        console.log(values)
    };

    const handleValidate = () => {
        const {name, email, password, confirmPassword} = values
        return name && email && password === confirmPassword ? true
            :
            password !== confirmPassword ?
                alert('Please make sure your passwords match.')
                :
                alert('Please make sure no details are missing.')
    }


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
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    onChange={handleChange('name')}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange('email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={handleChange('password')}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={handleChange('confirmPassword')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                    </form>
                    <Mutation mutation={signupMutation}>
                        {signupMutation => {
                            return (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={async () => {
                                        const {name, email, password} = values
                                        let variables = {name, email, password, username: email}
                                        if (handleValidate()) {
                                            await signupMutation({variables: variables})
                                                .then(async ({data}) => {
                                                    console.log(data)
                                                    if (!!data) {
                                                        const {token} = data.signup
                                                        console.log(token)
                                                        localStorage.setItem('x-auth-token', token);
                                                        await props.client.resetStore()
                                                        props.history.push('/')
                                                    }

                                                })
                                        }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            )

                        }}

                    </Mutation>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Typography color={'primary'} component={Link} to={'/'} variant={"body2"}>
                                Already have an account? Sign in!
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
}

export default withApollo(SignupPage)


// import React from 'react';
// import PropTypes from 'prop-types';
// import { withApollo } from 'react-apollo';
// import { FormProps } from '../../render-props';
// // import { FormProps } from 'react-state-helpers-via-render-props';
// // import SEO from '../../components/smart/seo';
// import EmailForm from '../../components/auth/email-form';
// import PasscodeForm from '../../components/auth/passcode-form';
// import SignupApiCall from '../../components/auth/signup-api-call';
// import SendPasscode from '../../components/auth/send-passcode';
// import LoginApiCall from '../../components/auth/login-api-call';
// import ResendPasscodeBtn from '../../components/auth/resend-passcode-btn';
// import AuthPageLayout from '../../layouts/auth-page';
// import Feedback from '../../components/common/feedback';
// import ButtonLink from '../../components/common/button-link';
//
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// // After PasscodeAuthView returns successful, the user logged-in-state will change
// // from 'logged out' to 'logged in' automatically. This will trigger the
// // LoggedOutRoute component's logic (said component wraps the SignupPage component)
// // which will result in redirecting the user to home page automatically.
// class SignupPage extends React.PureComponent {
//   state = {
//     view: 'emailView',
//     email: '',
//   }
//
//   render() {
//     const { client, onPageChange } = this.props;
//     const { view, email } = this.state;
//
//     const loginLink = (
//       <ButtonLink onClick={() => { onPageChange('login'); }}>
//         Log In
//       </ButtonLink>
//     );
//
//     return (
//       <FormProps>
//         {({
//           disabled,
//           errorMsg,
//           successMsg,
//           setSuccessMessage,
//           handleBefore,
//           handleClientCancel,
//           handleClientError,
//           handleServerError,
//           handleSuccess,
//         }) => (
//           <AuthPageLayout
//             title={view === 'emailView' ? 'Sign Up' : 'Enter Pass Code'}
//             subtitle={view === 'emailView' ? 'Already have an account?' : 'Haven\'t received the pass code?'}
//             link={view === 'emailView'
//               ? loginLink
//               : (
//                 <ResendPasscodeBtn
//                   email={email}
//                   label="Resend it"
//                   disabled={disabled}
//                   onBeforeHook={handleBefore}
//                   handleClientCancelHook={handleClientCancel}
//                   onSendError={handleServerError}
//                   onSendSuccess={() => {
//                     // Extend formProps.handleSuccess' default functionality
//                     handleSuccess(() => {
//                       // Show success message after action is completed
//                       setSuccessMessage('A new email has been sent to your inbox!');
//                     });
//                   }}
//                 />
//               )
//             }
//           >
//             {view === 'emailView' && (
//               <SendPasscode
//                 onSendError={handleServerError}
//                 onSendSuccess={() => {
//                   // Extend formProps.handleSuccess' default functionality
//                   handleSuccess(() => {
//                     // Show success message after action is completed
//                     setSuccessMessage('A new email has been sent to your inbox!');
//                     // Switch to passcodeView view
//                     this.setState({ view: 'passcodeView' });
//                   });
//                 }}
//               >
//                 {({ sendPasscode }) => (
//                   <SignupApiCall
//                     onSignupError={handleServerError}
//                     onSignupSuccess={(newUser) => {
//                       sendPasscode({ email: newUser.email });
//                     }}
//                   >
//                     {({ signupUser }) => (
//                       <EmailForm
//                         btnLabel="Send Pass Code"
//                         disabled={disabled}
//                         onBeforeHook={handleBefore}
//                         handleClientCancelHook={handleClientCancel}
//                         onClientErrorHook={handleClientError}
//                         onSuccessHook={(inputFields) => {
//                           // Store current user's email and fire signup api call
//                           this.setState(
//                             { email: inputFields.email },
//                             () => { signupUser({ email: inputFields.email }); },
//                           );
//                         }}
//                       />
//                     )}
//                   </SignupApiCall>
//                 )}
//               </SendPasscode>
//             )}
//             {view === 'passcodeView' && (
//               <LoginApiCall
//                 email={email}
//                 onLoginError={handleServerError}
//                 onLoginSuccess={({ token }) => {
//                   // Extend formProps.handleSuccess' default functionality
//                   handleSuccess(() => {
//                     // Store token into browser and resetStore to update client data
//                     localStorage.setItem('x-auth-token', token);
//                     client.resetStore();
//                   });
//                 }}
//               >
//                 {({ loginUser }) => (
//                   <PasscodeForm
//                     btnLabel="Enter"
//                     disabled={disabled}
//                     onBeforeHook={handleBefore}
//                     handleClientCancelHook={handleClientCancel}
//                     onClientErrorHook={handleClientError}
//                     // Fire login api call
//                     onSuccessHook={loginUser}
//                   />
//                 )}
//               </LoginApiCall>
//             )}
//             <div className="mb2" />
//             <Feedback
//               loading={disabled}
//               errorMsg={errorMsg}
//               successMsg={successMsg}
//             />
//           </AuthPageLayout>
//         )}
//       </FormProps>
//     );
//   }
// }
//
// SignupPage.propTypes = {
//   client: PropTypes.shape({
//     resetStore: PropTypes.func.isRequired,
//   }).isRequired,
//   onPageChange: PropTypes.func,
// };
//
// SignupPage.defaultProps = {
//   onPageChange: () => {},
// };
//
// export default withApollo(SignupPage);
