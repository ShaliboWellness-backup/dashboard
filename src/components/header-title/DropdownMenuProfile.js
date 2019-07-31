import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import {Avatar, ButtonBase, ListItemAvatar} from "@material-ui/core";


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
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
                    <Avatar alt={"ShaliboLogo"}
                            src={"https://scontent.fhfa1-1.fna.fbcdn.net/v/t1.0-9/1471112_942030945860301_2736404039396499273_n.png?_nc_cat=106&_nc_oc=AQlXrpgkHydn-yxT76PO2KIIgCnda5AcvsWyTOZVYj35Y9ryLTcPe-KU7WqqJhnkMoU&_nc_ht=scontent.fhfa1-1.fna&oh=6f2c1ca63d7078412c9c356518350d1d&oe=5DA6ECE7"}/>
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
                    <ListItemIcon>
                        <PowerSettingsNew/>
                    </ListItemIcon>
                    <ListItemText primary="Log Out"/>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

export default DropdownMenuProfile
