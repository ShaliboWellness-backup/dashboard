import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { useApolloClient } from '@apollo/client';
import MenuItem from '@material-ui/core/MenuItem';
import SnackbarContext from '../../../containers/CustomSnackbar/SnackbarContext';
import deleteUserMutation from '../../../graphql/user/mutation/delete-user';

const ConfirmDelete = ({ _id, closeMenu, refetch }) => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    closeMenu();
  }

  const client = useApolloClient();

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <Typography variant="body1" color="textSecondary">
          Delete
        </Typography>
      </MenuItem>
      <Dialog
        PaperProps={{ style: { backgroundColor: '#e99698', color: 'black' } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete User?</DialogTitle>
        <DialogContent>
          <DialogContentText color="inherit">
            Are you sure you want to delete this user? Once deleted, all user information will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <SnackbarContext.Consumer>
            {(value) => (
              <Button
                onClick={() => {
                  client.mutate({
                    mutation: deleteUserMutation,
                    variables: { _id },
                  })
                    .then(() => {
                      value.openSnackbar('success', 'User Deleted Successfully');
                      console.log('user deleted');
                      handleClose();
                      refetch();
                    })
                    .catch((error) => {
                      console.log(error);
                      value.openSnackbar('error', 'Could not delete user');
                      handleClose();
                    });
                }}
                color="inherit"
              >
                Delete
              </Button>
            )}
          </SnackbarContext.Consumer>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDelete;
