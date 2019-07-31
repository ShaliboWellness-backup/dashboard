import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IconButton} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import PromotionDialog from "./PromotionDialog";
import EventDialog from "./EventDialog"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


export default function CreateDialog(props) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                <Edit/>
            </IconButton>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {props.type === 'event' ? <EventDialog handleClose={handleClose} event={props.event}/> : <PromotionDialog handleClose={handleClose}/>}
            </Dialog>
            </MuiPickersUtilsProvider>
         </div>
    );
}
