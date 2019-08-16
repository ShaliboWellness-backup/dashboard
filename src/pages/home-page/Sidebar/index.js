import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PermIdentity from '@material-ui/icons/PermIdentity';
import DirectionsRun from "@material-ui/icons/DirectionsRun"
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import {Avatar, ListItemAvatar, Paper} from '@material-ui/core';
import {Link} from 'react-router-dom';

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
    }
});

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedIndex: ''};
    }

    handleListItemClick = (event, index) => {
        this.setState({selectedIndex: index});
    }


    render() {
        const {classes} = this.props;
        const {selectedIndex} = this.state;
        return (
            <Paper elevation={18} className={classes.root}>

                <List component="nav" aria-label="main mailbox folders">

                    <ListItem className={classes.logo} component={Link} to="/"
                              onClick={event => this.handleListItemClick(event, null)}>
                        <ListItemAvatar>
                            <Avatar alt="ShaliboLogo"
                                    src="https://scontent.fhfa1-1.fna.fbcdn.net/v/t1.0-9/1471112_942030945860301_2736404039396499273_n.png?_nc_cat=106&_nc_oc=AQlXrpgkHydn-yxT76PO2KIIgCnda5AcvsWyTOZVYj35Y9ryLTcPe-KU7WqqJhnkMoU&_nc_ht=scontent.fhfa1-1.fna&oh=6f2c1ca63d7078412c9c356518350d1d&oe=5DA6ECE7"/>
                        </ListItemAvatar>
                        <ListItemText classes={{primary: classes.text}} primary="Shalibo Wellness"
                                      primaryTypographyProps={{color: 'textSecondary', variant: 'body1'}}/>


                    </ListItem>
                    <Divider style={{opacity: 0.75, marginBottom: 15, background: "hsla(0,0%,100%,.5)"}}
                             variant="middle"/>

                    <ListItem
                        component={Link}
                        to="/members"
                        button
                        selected={selectedIndex === 1}
                        onClick={event => this.handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <PermIdentity fontSize={"small"} style={{color: '#fff'}}/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.text}} primary="Members"
                                      primaryTypographyProps={{variant: 'body2'}}/>
                    </ListItem>


                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        onClick={event => this.handleListItemClick(event, 2)}
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
                        selected={selectedIndex === 3}
                        onClick={event => this.handleListItemClick(event, 3)}
                        component={Link}
                        to="/promotions"
                    >
                        <ListItemIcon>
                            <ShoppingBasket fontSize={"small"} style={{color: '#fff'}}/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.text}} primary="Promotions"
                                      primaryTypographyProps={{variant: 'body2'}}/>
                    </ListItem>


                    {/* <ListItem */}
                    {/*    button */}
                    {/*    selected={selectedIndex === 3} */}
                    {/*    onClick={event => this.handleListItemClick(event, 3)} */}
                    {/*    component={Link} */}
                    {/*    to={"/statistics"} */}
                    {/* > */}
                    {/*    <ListItemIcon> */}
                    {/*        <Timeline style={{color:"#fff"}}/> */}
                    {/*    </ListItemIcon> */}
                    {/*    <ListItemText classes={{primary: classes.text}} primary="Statistics" primaryTypographyProps={{ variant:"body2"}}/> */}
                    {/* </ListItem> */}

                </List>


            </Paper>
        );
    }
}

export default withStyles(styles)(Sidebar);
