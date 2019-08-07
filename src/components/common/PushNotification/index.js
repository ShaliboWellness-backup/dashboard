import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import {IconButton, Typography} from "@material-ui/core";
import NotificationActives from "@material-ui/icons/NotificationsActive";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';


const PushNotification = ({icon, handleClick}) => {

    const [open, setOpen] = React.useState(false);

    const [values, setValues] = React.useState({
        title: '',
        message: '',
    });

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setValues({title: "", message: ""})
    }

    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
        console.log(values)
    };

    return (
        <div>
            {icon ? (<Tooltip TransitionComponent={Zoom} title="Send Notification">
                    <IconButton onClick={() => handleClickOpen()}>
                        <NotificationActives color={"primary"}/>
                    </IconButton>
                </Tooltip>)
                :
                <MenuItem onClick={() => {
                    handleClickOpen();
                    handleClick()
                }}>
                    <Typography variant={"body1"} color={"textSecondary"}>
                        Notification
                    </Typography>
                </MenuItem>}

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Send Notification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        By pressing OK you will send a push notification to all users in the relevant group
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="title"
                        label="Title"
                        value={values.title}
                        type="text"
                        fullWidth
                        onChange={handleChange('title')}
                        variant={"outlined"}

                    />
                    <TextField
                        margin="dense"
                        id="message"
                        label="Message"
                        value={values.message}
                        type="text"
                        fullWidth
                        multiline
                        onChange={handleChange('message')}
                        variant={"outlined"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PushNotification;
