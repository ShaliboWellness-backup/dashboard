import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { CardHeader } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { useApolloClient } from '@apollo/client';
import { Scrollbars } from 'react-custom-scrollbars-2';
import AttendingUsers from './AttendingUsers';
import UserPicker from '../../../components/common/AutoSuggest';
import CurrentCompanyContext from '../../../containers/CurrentCompany/CurrentCompanyContext';
import updateEventMutation from '../../../graphql/event/mutation/update-event';

const R = require('ramda');

const styles = (theme) => ({
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    position: 'relative',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

  },
  cardContent: {
    flexGrow: 1,
    alignItems: 'flex-start',
    paddingTop: 0,

  },
  timeCaption: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  count: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    color: 'white',
  },
  scrollbarThumb: {
    background: 'linear-gradient(0deg, #0098f0 0%, #00f2c3 100%)',
    opacity: 0.5,
    borderRadius: 10,
  },
});

let userToAdd = null;

function EventModal(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const companyContext = React.useContext(CurrentCompanyContext);
  const company = (companyContext != null) ? companyContext.currentCompany : null;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const { event, classes } = props;
  const client = useApolloClient();

  const userPickerRef = useRef();
  return (
    <div>
      <div style={{ cursor: 'pointer' }} onClick={handleClickOpen}>
        {props.children}
      </div>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        scroll="body"
      >
        <CardMedia
          className={classes.cardMedia}
          image={event.image}
          title={event.title}
          src=""
        >

          <Typography className={classes.count} variant="h6">
            {`${event.users.length}/${event.totalSpots} spots `}
          </Typography>

        </CardMedia>
        <CardHeader
          style={{ textTransform: 'capitalize' }}
          title={`${event.title} with ${R.pathOr('Unknown', ['firstName'])(event.instructor)} ${R.pathOr('', ['lastName'])(event.instructor)}`}
          subheader={`${moment(event.date).format(' MMMM Do, HH:mm')} at ${event.location}`}
          // subheaderTypographyProps={{style: {color: 'white'}}}
          // titleTypographyProps={{style: {color: 'white'}}}
        />

        <DialogContent className={classes.cardContent}>
          <Typography>{event.description}</Typography>

          <AttendingUsers event={event} users={event.users} style={{ marginBottom: 20 }}>
            <div style={{
              marginLeft: 26,
              display: 'flex',
              flexDirection: 'row',
            }}
            >
              <UserPicker
                users={(() => {
                  if (company && company.users) {
                    const eventUserIds = event.users.map((user) => user._id);
                    const filtered = company.users.filter((user) => eventUserIds.indexOf(user._id) === -1);
                    return filtered;
                  }
                  return [];
                })()}

                onSelected={(selectedUser) => {
                  userToAdd = selectedUser;
                }}
                ref={userPickerRef}
              />
              <Button
                onClick={() => {
                  const picker = userPickerRef.current;
                  if (userToAdd) {
                    event.users.push(userToAdd);
                    client.mutate({
                      mutation: updateEventMutation,
                      variables: {
                        _id: event._id,
                        users: event.users.map((user) => user._id),
                      },
                    }).then((value) => {
                      userToAdd = null;
                      picker.onChange(null, { newValue: '' });
                      picker.onSuggestionsClearRequested();
                    });
                  }
                }}
                color="primary"
              >Add
              </Button>
            </div>
          </AttendingUsers>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(EventModal);
