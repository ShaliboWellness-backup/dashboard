import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {useApolloClient} from '@apollo/react-hooks'
import forgotPasswordMutation from "../../../graphql/user/mutation/forgot-password";
import SnackbarContext from '../../../containers/CustomSnackbar/SnackbarContext'


const ForgotPasswordDialog = (props) => {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [values, setValues] = React.useState({
        email: "",
    });

    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
        console.log(values)

    };

    const client = useApolloClient()

    return (
        <div>
            <Typography style={{cursor: 'pointer'}} color={'primary'} onClick={handleClickOpen}>
                Forgot password?
            </Typography>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Forgot Password?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To reset your password please enter your email and click the 'Send Reset Email' button.
                        An email with a reset link will be sent to your email shortly.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        onChange={handleChange('email')}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <SnackbarContext.Consumer>
                        {value => {
                            return <Button onClick={() => {
                                const {email} = values
                                return !email ?
                                    value.openSnackbar('error', 'Please enter your email')
                                    :
                                    client.mutate({
                                        mutation: forgotPasswordMutation,
                                        variables: {email}
                                    })
                                        .then(({data}) => {
                                            const {forgotPassword} = data
                                            value.openSnackbar('success', forgotPassword)
                                            handleClose()
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                            value.openSnackbar('error', 'Invalid email. Please try again.')
                                        })

                            }} color="primary">
                                Send Reset Email
                            </Button>
                        }}
                    </SnackbarContext.Consumer>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ForgotPasswordDialog
