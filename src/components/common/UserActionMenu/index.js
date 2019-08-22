import React from 'react';
import {IconButton, Typography} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useApolloClient} from '@apollo/react-hooks'
import UserDialog from "./UserDialog";
import deleteUserMutation from "../../../graphql/user/mutation/delete-user";


const UserActionMenu = ({user}) => {
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
                <MoreVertIcon color={"primary"}/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                transformOrigin={{horizontal: "right", vertical: "top"}}
            >

                <UserDialog user={user} closeMenu={handleClose}/>

                <MenuItem onClick={() => {
                    client.mutate({
                        mutation: deleteUserMutation,
                        variables: {_id: user._id}
                    })
                        .then(() => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                }}>
                    <Typography variant={"body1"} color={"textSecondary"}>
                        Delete
                    </Typography>
                </MenuItem>

            </Menu>
        </div>
    );
};


export default UserActionMenu;