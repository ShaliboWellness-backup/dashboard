import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar, ButtonBase, ListItemAvatar } from '@material-ui/core';
import { withApollo } from '@apollo/client/react/hoc';

import logo from '../../../Assets/shalibo-app-icon.png';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {},
}))(MenuItem);

const DropdownMenuProfile = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    localStorage.removeItem('x-auth-token');
    props.client.resetStore();
  };

  return (
    <div>
      <ButtonBase
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <ListItemAvatar>
          <Avatar
            style={{ width: 30, height: 30, marginBottom: 5 }}
            alt="ShaliboLogo"
            src={logo}
          />
        </ListItemAvatar>
      </ButtonBase>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          {/* <ListItemIcon> */}
          {/*    <PowerSettingsNew scale={"sm"}/> */}
          {/* </ListItemIcon> */}
          <ListItemText
            primaryTypographyProps={{ variant: 'body1', color: 'textSecondary' }}
            primary="Log Out"
            onClick={() => handleLogout()}
          />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default withApollo(DropdownMenuProfile);
