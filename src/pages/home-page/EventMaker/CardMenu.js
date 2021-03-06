import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useApolloClient } from '@apollo/client';
import deleteEventMakerMutation from '../../../graphql/event-maker/mutation/delete-event-maker';
import EventMakerDialog from './EventMakerDialog';
import eventMakersQuery from '../../../graphql/event-maker/query/event-maker';

const ActionMenu = ({ card, promotion }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const client = useApolloClient();

  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon color="primary" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >

        <EventMakerDialog action="edit" event={card} handleClose={handleClose} />

        <MenuItem onClick={() => {
          client.mutate({
            mutation: deleteEventMakerMutation,
            variables: { _id: card._id },
            refetchQueries: [{ query: eventMakersQuery }],
          })
            .then(() => {
              console.log(`item with id: ${card._id} was deleted!`);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        >
          <Typography variant="body1" color="textSecondary">
            Delete
          </Typography>
        </MenuItem>

      </Menu>
    </div>
  );
};

export default ActionMenu;
