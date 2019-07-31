import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles'
import Paper from "@material-ui/core/Paper";
import SidebarList from "./SidebarList";


const styles = theme => ({
    paper: {
        background: "linear-gradient(0deg, #0098f0 0%, #00f2c3 100%)",
        height: 500,
        width: 230,
        position: "fixed",
        left: 16,
        top: 80


    }

})
const Sidebar = ({classes}) => {

        return (
            <Fragment>
                <Paper className={classes.paper} elevation={12}>
                <SidebarList/>
                </Paper>
            </Fragment>
        );

}

Sidebar.propTypes = {};

export default withStyles(styles)(Sidebar);
