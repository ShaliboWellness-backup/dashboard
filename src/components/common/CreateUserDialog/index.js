import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Dialog, DialogContent, Fab, Paper, useMediaQuery} from '@material-ui/core'
import signupMutation from "../../../graphql/signup";
import {withApollo} from "react-apollo";
import {useApolloClient} from '@apollo/react-hooks'
import SnackbarContext from "../../../containers/CustomSnackbar/SnackbarContext";
import Add from "@material-ui/icons/Add";
import searchUsersQuery from "../../../graphql/user/query/search-users";
import usersQuery from "../../../graphql/user/query/users";


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            // backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 32


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
        margin: theme.spacing(2, 0, 0),
    },
}));


const CreateUserDialog = (props) => {
    const classes = useStyles();

    const client = useApolloClient()

    const [values, setValues] = React.useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const snackbar = React.useContext(SnackbarContext)

    const [open, setOpen] = React.useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
        console.log(values)
    };

    const handleValidate = () => {
        const {firstName, lastName, phone, email, password, confirmPassword} = values
        return firstName && lastName && phone && email && password === confirmPassword ? true
            :
            password !== confirmPassword ?
                snackbar.openSnackbar('error', 'Please make sure your passwords match.')
                :
                snackbar.openSnackbar('error', 'Please make sure no details are missing.')
    }


    return (
        <div>
            <Fab variant={"extended"} size={'small'} style={{paddingRight: 16, paddingLeft: 16}} color={'primary'}
                 onClick={() => setOpen(true)}>
                <Add fontSize={'small'}/> New User
            </Fab>
            <Dialog maxWidth={"sm"} scroll={"body"} fullScreen={fullScreen} open={open} onClose={() => setOpen(false)}>
                <CssBaseline/>
                <DialogContent className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Create New User
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

                        </Grid>
                    </form>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={async () => {
                            const {firstName, lastName, phone, email, password} = values
                            let variables = {firstName, lastName, phone, email, password,}
                            if (handleValidate()) {
                                await client.mutate({
                                    mutation: signupMutation,
                                    variables,
                                })
                                    .then(({data}) => {
                                        console.log(data)
                                        setOpen(false)
                                        if (!!data) {
                                            console.log('user created')
                                        }
                                    })
                                    .catch((error) => {
                                        snackbar.openSnackbar('error', 'Something went wrong. Please try again later.')
                                        setOpen(false)
                                    })
                            }
                            props.refetch()
                        }}
                    >
                        Create
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default withApollo(CreateUserDialog)

