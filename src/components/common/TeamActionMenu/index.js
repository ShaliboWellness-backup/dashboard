import React from 'react';
import { IconButton, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useApolloClient } from '@apollo/react-hooks'
import UserDialog from "./TeamDialog";
import deleteUserMutation from "../../../graphql/user/mutation/delete-user";
import ConfirmDelete from "./ConfirmDelete";


const TeamActionMenu = ({ team, refetch }) => {
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
                <MoreVertIcon color={"primary"} />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                MenuListProps={{ style: { border: '1px solid #c7c7c7', borderRadius: 5 } }}

            >

                <UserDialog team={team} closeMenu={handleClose} />

                <ConfirmDelete _id={team._id} closeMenu={handleClose} />


            </Menu>
        </div>
    );
};


export default TeamActionMenu;
