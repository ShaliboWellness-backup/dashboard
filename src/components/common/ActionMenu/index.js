import React from 'react';
import {IconButton, Typography} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu";
import CreateDialog from "../CreateDialog";
import {Mutation} from "react-apollo";
import MenuItem from "@material-ui/core/MenuItem";
import PushNotification from "../PushNotification";
import deletePromotionMutation from "../../../graphql/promotion/mutation/delete-promotion";
import deleteEventMutation from "../../../graphql/event/mutation/delete-event";


const ActionMenu = ({card, promotion}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const mutation = promotion ? deletePromotionMutation : deleteEventMutation

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

                <CreateDialog type={promotion ? 'promotion' : 'companies.js'} data={card}/>

                <Mutation mutation={mutation}>
                    {(deleteMutation, {data}) => (
                        <MenuItem onClick={() => {
                            deleteMutation({variables: {id: card.id}});
                            window.location.reload();
                        }}>
                            <Typography variant={"body1"} color={"textSecondary"}>
                                Delete
                            </Typography>
                        </MenuItem>
                    )}
                </Mutation>

                {promotion ? null : <PushNotification handleClick={handleClose}/>}


            </Menu>
        </div>
    );
}


export default ActionMenu;
