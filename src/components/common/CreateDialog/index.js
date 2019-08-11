import React, {Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {IconButton, Paper, Typography} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import PromotionDialog from './PromotionDialog';
import EventDialog from './EventDialog';
import Add from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';


export default function CreateDialog(props) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Fragment>
            {props.action === 'create' ? (
                <Paper style={{
                    height: "100%",
                    minHeight: 300, display: "flex", justifyContent: "center", alignItems: "center"
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
                <MenuItem onClick={handleClickOpen}>
                    <Typography variant={"body1"} color={"textSecondary"}>
                        Edit
                    </Typography>
                </MenuItem>
            )}

            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Dialog maxWidth={"sm"} scroll={"body"} open={open} onClose={handleClose}
                        aria-labelledby="form-dialog-title">
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
