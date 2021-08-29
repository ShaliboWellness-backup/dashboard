import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { withApollo } from '@apollo/client/react/hoc';

import { useApolloClient } from '@apollo/client';
import signupMutation from '../../graphql/signup';
import background from '../../fakeData/Images/loginBg.jpg';
import SnackbarContext from '../../containers/CustomSnackbar/SnackbarContext';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,

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
}));

const SignupPage = (props) => {
  const classes = useStyles();

  const client = useApolloClient();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const snackbar = React.useContext(SnackbarContext);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    console.log(values);
  };

  const handleValidate = () => {
    const {
      firstName, lastName, phone, email, password, confirmPassword,
    } = values;
    return firstName && lastName && phone && email && password === confirmPassword ? true
      : password !== confirmPassword
        ? snackbar.openSnackbar('error', 'Please make sure your passwords match.')
        : snackbar.openSnackbar('error', 'Please make sure no details are missing.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url("${background}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
    }}
    >

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  onChange={handleChange('firstName')}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange('lastName')}

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
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleChange('phone')}
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
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                const {
                  firstName, lastName, phone, email, password,
                } = values;
                const variables = {
                  firstName, lastName, phone, email: email.trim().toLowerCase(), password: password.trim(),
                };
                if (handleValidate()) {
                  client.mutate({ mutation: signupMutation, variables })
                    .then(({ data }) => {
                      console.log(data);
                      if (data) {
                        const { token } = data.signup;
                        console.log(token);
                        localStorage.setItem('x-auth-token', token);
                        props.client.resetStore();
                        props.history.push('/');
                      }
                    })
                    .catch((error) => {
                      snackbar.openSnackbar('error', 'Something went wrong. Please try again later.');
                    });
                }
              }}
            >
              Sign Up
            </Button>
          </form>

          <Grid container justify="center">
            <Grid item>
              <Typography
                style={{ textDecoration: 'none' }}
                color="primary"
                component={Link}
                to="/login"
              >
                Already have an account? Sign in!
              </Typography>
            </Grid>
          </Grid>
        </Paper>

      </Container>
    </div>
  );
};

export default withApollo(SignupPage);
