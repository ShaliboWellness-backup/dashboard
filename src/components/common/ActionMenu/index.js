import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useApolloClient } from '@apollo/client';
import CreateDialog from '../CreateDialog';
import PushNotification from '../PushNotification';
import deletePromotionMutation from '../../../graphql/promotion/mutation/delete-promotion';
import deleteEventMutation from '../../../graphql/event/mutation/delete-event';

const ActionMenu = ({ card, promotion }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const client = useApolloClient();
  const mutation = promotion ? deletePromotionMutation : deleteEventMutation;

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
        MenuListProps={{ style: { border: '1px solid #c7c7c7', borderRadius: 5 } }}

      >

        <CreateDialog type={promotion ? 'promotion' : 'event'} data={card} handleClose={handleClose} />

        <MenuItem onClick={() => {
          client.mutate({
            mutation,
            variables: { _id: card._id },
          })
            .then(() => {
              console.log(`item with id: ${card._id} was deleted!`);
              handleClose();
            })
            .catch((error) => {
              console.log(error);
              handleClose();
            });
        }}
        >
          <Typography variant="body1" color="textSecondary">
            Delete
          </Typography>
        </MenuItem>

        {promotion ? null : <PushNotification handleClick={handleClose} />}

      </Menu>
    </div>
  );
};

export default ActionMenu;
