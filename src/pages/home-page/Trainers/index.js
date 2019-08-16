import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Avatar, Typography} from "@material-ui/core";
import PushNotification from "../../../components/common/PushNotification";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 15
    },
    table: {
        minWidth: 650,

    },
    tableHead: {
        fontWeight: 700,
        color: "#222a42b3",
        fontSize: "0.875rem"
    },
    tableBody: {
        fontWeight: 400,
        color: "#222a42b3",
        fontSize: "0.875rem"
    },

})


const Trainers = ({classes, users}) => {

    let trainers = users.filter(user => user.roles.includes('trainer'))

    return (
        <Paper className={classes.root}>
            <Typography variant={"h5"} style={{fontWeight: 100}}>
                Trainers
            </Typography>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>
                            <PushNotification icon/>
                        </TableCell>
                        <TableCell className={classes.tableHead}>Name</TableCell>
                        <TableCell className={classes.tableHead}>Email</TableCell>
                        <TableCell className={classes.tableHead}>Company</TableCell>
                        <TableCell className={classes.tableHead}>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trainers.map(user => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                <Avatar alt={user.first_name} src={user.image}/>
                            </TableCell>
                            <TableCell className={classes.tableBody}>{user.name}</TableCell>
                            <TableCell className={classes.tableBody}>{user.email}</TableCell>
                            <TableCell className={classes.tableBody}>""</TableCell>
                            <TableCell className={classes.tableBody}>Trainer</TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(Trainers)
