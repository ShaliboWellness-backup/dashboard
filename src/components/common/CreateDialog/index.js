import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  Fab, IconButton, Paper, Typography, useTheme,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Add from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import EventDialog from './EventDialog';
import PromotionDialog from './PromotionDialog';

moment.tz.setDefault('Asia/Jerusalem');

const R = require('ramda');

export default function CreateDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleCloseMenu = R.pathOr(() => {
  }, ['handleClose'])(props);

  function handleClickOpen() {
    setOpen(true);
    handleCloseMenu();
  }

  function handleClose() {
    setOpen(false);
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {props.action === 'create' ? (
        <Fab
          style={{
            position: !fullScreen ? 'absolute' : 'relative',
            left: 0,
            padding: fullScreen ? null : '0px 24px',
            marginRight: 24,
          }}
          size="small"
          variant={fullScreen ? 'round' : 'extended'}
          color="primary"
          onClick={handleClickOpen}
        >
          <Add /> {fullScreen ? null : `Create ${props.type === 'event' ? 'Event' : 'Promotion'}`}
        </Fab>

      ) : (
        <MenuItem onClick={handleClickOpen}>
          <Typography variant="body1" color="textSecondary">
            Edit
          </Typography>
        </MenuItem>
      )}

      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <Dialog
          maxWidth="sm"
          scroll="body"
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {props.type === 'event'
            ? <EventDialog action={props.action} handleClose={handleClose} event={props.data} />
            : <PromotionDialog action={props.action} handleClose={handleClose} promotion={props.data} />}
        </Dialog>
      </MuiPickersUtilsProvider>
    </>
  );
}

CreateDialog.defaultProps = {
  type: 'promotion',
  action: 'edit',
};
