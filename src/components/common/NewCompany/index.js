import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import { Mutation } from '@apollo/client/react/components';
import Add from '@material-ui/icons/Add';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField, useTheme, useMediaQuery,
} from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import CreateCompanyMutation from '../../../graphql/companies/mutation/create-company';
import SnackbarContext from '../../../containers/CustomSnackbar/SnackbarContext';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',

  },
  textField: {
    marginLeft: 8,
    marginRight: 8,
  },
});

function NewCompany({ classes, closeMenu }) {
  const client = useApolloClient();

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
    closeMenu();
  }

  function handleClose() {
    setOpen(false);
  }

  const [values, setValues] = React.useState({
    name: '',
    emailSuffix: '',
    logo: '',

  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: 'body1', color: 'textSecondary' }}
          primary="New Company"
        />
      </MenuItem>

      <Dialog maxWidth="xs" fullScreen={fullScreen} scroll="body" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Create New Company</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange('name')}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="emailSuffix"
              label="Email Suffix"
              className={classes.textField}
              value={values.emailSuffix}
              onChange={handleChange('emailSuffix')}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="logo"
              label="Logo"
              className={classes.textField}
              value={values.logo}
              onChange={handleChange('logo')}
              margin="normal"
              variant="outlined"
              fullWidth
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <SnackbarContext.Consumer>
            {(value) => (
              <Button
                onClick={() => {
                  const { name, emailSuffix, logo } = values;
                  const variables = { name, emailSuffix: emailSuffix.trim().toLowerCase(), logo };
                  return name === ''
                                    || emailSuffix === ''
                                    || logo === ''
                    ? value.openSnackbar('error', 'Please make sure there are no empty fields')
                    : client.mutate({
                      mutation: CreateCompanyMutation,
                      variables,
                    })
                      .then(() => {
                        handleClose();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                }}
                color="primary"
              >
                OK
              </Button>
            )}

          </SnackbarContext.Consumer>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(NewCompany);
