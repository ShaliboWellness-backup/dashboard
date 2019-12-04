import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CurrentCompanyContext from "../../../containers/CurrentCompany/CurrentCompanyContext";
import {Avatar, ListItemAvatar, ListItemSecondaryAction} from "@material-ui/core";
import EditCompany from "../../common/EditCompany";
import {Link} from "react-router-dom";
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import PermIdentity from '@material-ui/icons/PermIdentity';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Timer from '@material-ui/icons/TimerOutlined'

const R = require("ramda");


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    root: {
        boxShadow: "0px 2px 20px 0px #C2C2C2",
        width: 230,
        height: "100%",
        background: 'linear-gradient(0deg, #0098f0 0%, #00f2c3 100%)',

    },
    text: {
        color: 'white',
        textTransform: "uppercase",
    },
    logo: {
        marginBottom: 5,
        boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.3)",
        padding: 0,
        //background: "#000"
    }
});

export default function MobileSidebar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const [selectedIndex, setIndex] = React.useState(null)

    const value = React.useContext(CurrentCompanyContext)

    const handleListItemClick = (event, index) => {
        setIndex(index)
        toggleDrawer(false)
    }
    const currentCompany = R.pathOr({name: "", emailSuffix: "", logo: ""}, ["currentCompany"])(value)

    const toggleDrawer = (open) => {
        setState(open);
    };

    const sideList = side => (
        <div
            className={classes.root}
            role="presentation"

        >
            <List component="nav" aria-label="main mailbox folders">
                <ListItem
                    onClick={event => handleListItemClick(event, null)}>
                    <ListItemAvatar>
                        <Avatar className={classes.logo}
                                alt="ShaliboLogo"
                                src={currentCompany.logo}
                        />
                    </ListItemAvatar>
                    <ListItemText classes={{primary: classes.text}} primary={currentCompany.name}
                                  primaryTypographyProps={{color: 'textSecondary', variant: 'body1'}}/>
                    <ListItemSecondaryAction>
                        <EditCompany company={currentCompany}/>
                    </ListItemSecondaryAction>


                </ListItem>
                <Divider style={{opacity: 0.75, marginBottom: 15, background: "hsla(0,0%,100%,.5)"}}
                         variant="middle"/>

                <ListItem
                    component={Link}
                    to="/members"
                    button
                    selected={props.currentPath === '/members'}
                    onClick={event => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <PermIdentity fontSize={"small"} style={{color: '#fff'}}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.text}} primary={'Members'}
                                  primaryTypographyProps={{variant: 'body2'}}/>
                </ListItem>


                <ListItem
                    button
                    selected={props.currentPath === '/events'}
                    onClick={event => handleListItemClick(event, 2)}
                    component={Link}
                    to="/events"
                >
                    <ListItemIcon>
                        <FitnessCenter fontSize={"small"} style={{color: '#fff'}}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.text}} primary="Events"
                                  primaryTypographyProps={{variant: 'body2'}}/>
                </ListItem>

                <ListItem
                    button
                    selected={props.currentPath === '/events-completed'}
                    onClick={event => handleListItemClick(event, 2)}
                    component={Link}
                    to="/events-completed"
                >
                    <ListItemIcon>
                        <FitnessCenter fontSize={"small"} style={{color: '#fff'}}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.text}} primary="Completed Events"
                                  primaryTypographyProps={{variant: 'body2'}}/>
                </ListItem>

                <ListItem
                    button
                    selected={props.currentPath === '/event-maker'}
                    onClick={event => handleListItemClick(event, 4)}
                    component={Link}
                    to="/event-maker"
                >
                    <ListItemIcon>
                        <Timer fontSize={"small"} style={{color: '#fff'}}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.text}} primary="Event Maker"
                                  primaryTypographyProps={{variant: 'body2'}}/>
                </ListItem>

                <ListItem
                    button
                    selected={props.currentPath === '/promotions'}
                    onClick={event => handleListItemClick(event, 3)}
                    component={Link}
                    to="/promotions"
                >
                    <ListItemIcon>
                        <ShoppingBasket fontSize={"small"} style={{color: '#fff'}}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.text}} primary="Promotions"
                                  primaryTypographyProps={{variant: 'body2'}}/>
                </ListItem>

            </List>
        </div>
    );


    return (
        <div>
            <IconButton onClick={() => toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit"
                        aria-label="menu">
                <MenuIcon/>
            </IconButton>
            <SwipeableDrawer
                open={state}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
}
