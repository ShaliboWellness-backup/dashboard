import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IconButton, Typography, Paper} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import PromotionDialog from './PromotionDialog';
import EventDialog from './EventDialog';
import Add from '@material-ui/icons/Add';
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";


export default function CreateDialog(props) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        window.location.reload();
    }

    return (
        <Fragment>
            {props.action === 'create' ? (
                <Paper style={{
                    height: "100%",
                    minHeight: 425, display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{textAlign: "center"}}>
                        <IconButton style={{width: 100, height: 100,}} color="primary" onClick={handleClickOpen}>
                            <Add style={{width: 50, height: 50,}}/>
                        </IconButton>
                        <Typography variant={"h5"}>
                            Create {props.type === 'event' ? 'Event' : 'Promotion'}
                        </Typography>
                    </div>
                </Paper>
            ) : (
                <Tooltip TransitionComponent={Zoom} title="Edit">
                    <IconButton color="primary" onClick={handleClickOpen}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
            )}

            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    {props.type === 'event' ?
                        <EventDialog action={props.action} handleClose={handleClose} event={props.data}/> :
                        <PromotionDialog action={props.action} handleClose={handleClose} promotion={props.data}/>}
                </Dialog>
            </MuiPickersUtilsProvider>
        </Fragment>
    );
}

CreateDialog.defaultProps = {
    type: 'promotion',
    action: 'edit',
};
