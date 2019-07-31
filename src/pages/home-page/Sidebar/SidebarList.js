import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PermIdentity from '@material-ui/icons/PermIdentity';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Timeline from '@material-ui/icons/Timeline';
import {Avatar, ListItemAvatar} from "@material-ui/core";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        height: 500,
        width: 230,
        background: "linear-gradient(0deg, #0098f0 0%, #00f2c3 100%)",
    },
    text: {
        color:"white",
    }
})

class SidebarList extends Component {

    constructor(props) {
        super(props)
        this.state = { selectedIndex: ""}
    }

    handleListItemClick = (event, index) => {
        this.setState({selectedIndex: index})
    }



    render(){
        const { classes } = this.props
        const {selectedIndex} = this.state
        return (
            <div className={classes.root}>

                <List component="nav" aria-label="main mailbox folders">

                    <ListItem component={Link} to={"/"}>
                        <ListItemAvatar>
                            <Avatar alt={"ShaliboLogo"} src={"https://scontent.fhfa1-1.fna.fbcdn.net/v/t1.0-9/1471112_942030945860301_2736404039396499273_n.png?_nc_cat=106&_nc_oc=AQlXrpgkHydn-yxT76PO2KIIgCnda5AcvsWyTOZVYj35Y9ryLTcPe-KU7WqqJhnkMoU&_nc_ht=scontent.fhfa1-1.fna&oh=6f2c1ca63d7078412c9c356518350d1d&oe=5DA6ECE7"} />
                        </ListItemAvatar>
                        <ListItemText classes={{primary: classes.text}} primary={"Shalibo Wellness"} primaryTypographyProps={{color: "textSecondary"}}/>


                    </ListItem>
                    <Divider variant={"middle"} style={{margin: "10px 0"}}/>
                    <ListItem
                        component={Link}
                        to={"/members"}
                        button
                        selected={selectedIndex === 0}
                        onClick={event => this.handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <PermIdentity style={{color:"#fff"}}/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.text}} primary="Members"  primaryTypographyProps={{ variant:"body2"}}/>
                    </ListItem>


                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={event => this.handleListItemClick(event, 1)}
                        component={Link}
                        to={"/events"}
                    >
                        <ListItemIcon>
                            <CalendarToday style={{color:"#fff"}}/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.text}} primary="Events"  primaryTypographyProps={{variant:"body2"}}/>
                    </ListItem>


                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        onClick={event => this.handleListItemClick(event, 2)}
                        component={Link}
                        to={"/promotions"}
                    >
                        <ListItemIcon>
                            <ShoppingBasket style={{color:"#fff"}}/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.text}} primary="Promotions"  primaryTypographyProps={{ variant:"body2"}}/>
                    </ListItem>


                    {/*<ListItem*/}
                    {/*    button*/}
                    {/*    selected={selectedIndex === 3}*/}
                    {/*    onClick={event => this.handleListItemClick(event, 3)}*/}
                    {/*    component={Link}*/}
                    {/*    to={"/statistics"}*/}
                    {/*>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <Timeline style={{color:"#fff"}}/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText classes={{primary: classes.text}} primary="Statistics" primaryTypographyProps={{ variant:"body2"}}/>*/}
                    {/*</ListItem>*/}

                </List>


            </div>
        );
    }

}

export default withStyles(styles)(SidebarList)
