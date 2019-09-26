import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PermIdentity from '@material-ui/icons/PermIdentity';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import {Avatar, ListItemAvatar, ListItemSecondaryAction, Paper} from '@material-ui/core';
import {Link} from 'react-router-dom';
import CurrentCompanyContext from "../../../containers/CurrentCompany/CurrentCompanyContext";
import EditCompany from "../../common/EditCompany";
import Timer from '@material-ui/icons/TimerOutlined'
import useMediaQuery from '@material-ui/core/useMediaQuery';


const R = require("ramda");


const styles = theme => ({
    root: {
        position: 'fixed',
        left: 16,
        top: 83,
        height: 'calc(100vh - 100px)',
        boxShadow: "0px 2px 20px 0px #C2C2C2",
        width: 230,
        background: 'linear-gradient(0deg, #0098f0 0%, #00f2c3 100%)',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        textTransform: "uppercase",
    },
    logo: {
        marginBottom: 5,
        // boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.3)",
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 0,
        backgroundColor: "rgba(0,0,0,0.49)"
    }
});

const Sidebar = ({classes, currentPath}) => {

    const [selectedIndex, setIndex] = React.useState(null)

    const value = React.useContext(CurrentCompanyContext)

    const handleListItemClick = (event, index) => {
        setIndex(index)
    }
    const currentCompany = R.pathOr({name: "", emailSuffix: "", logo: ""}, ["currentCompany"])(value)

    console.log(currentPath)
    return (
        <Paper elevation={18} className={classes.root}>

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
                    selected={currentPath === '/members'}
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
                    selected={currentPath === '/events'}
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
                    selected={currentPath === '/promotions'}
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

                <ListItem
                    button
                    selected={currentPath === '/event-maker'}
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

            </List>


        </Paper>
    );
}

export default withStyles(styles)(Sidebar);
