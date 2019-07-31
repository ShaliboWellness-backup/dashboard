import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {Avatar, ListItemAvatar, Typography} from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"

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
    root: {
        marginTop: 5,
        marginBottom: 5,
        // '&:focus': {
        //     backgroundColor: theme.palette.primary.main,
        //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //         color: theme.palette.common.white,
        //     },
        // },
    },
}))(MenuItem);

 const DropdownMenuCompanies = ( props ) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
     const [company, setCompany] = React.useState(props.companies[0]);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);

    }

    function handleClose() {
        setAnchorEl(null);
    }

     function handleChangeCompany(company) {
         setCompany(company)
         props.handleSetCompany(company)
         handleClose()
     }

     const { companies } = props
    return (
        <div style={{marginRight:16}}>
            <ButtonBase
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="outlined"
                color="primary"
                onClick={handleClick}
            >
                <KeyboardArrowDown/>
                <div style={{textAlign:"center"}}>
                <Avatar alt={company.name} src={company.image} />
                <Typography variant="caption" color="textSecondary">
                    {company.name}
                </Typography>
                </div>

            </ButtonBase>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {companies.map((company) => {
                        return (
                            <StyledMenuItem onClick={() => handleChangeCompany(company)}>
                                <ListItemAvatar>
                                    <Avatar alt={company.name} src={company.image}/>
                                </ListItemAvatar>
                                <ListItemText primary={company.name}/>
                            </StyledMenuItem>
                        )
                    }
                    )
                }


            </StyledMenu>
        </div>
    );
}

export default DropdownMenuCompanies
