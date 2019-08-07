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

const trainers = [
    {
        "id": 1,
        "first_name": "Daniel",
        "last_name": "Shalibo",
        "email": "tyarn0@ed.gov",
        "gender": "Male",
        "image": "https://robohash.org/doloremquequassit.png?size=50x50&set=set1"
    },
    {
        "id": 2,
        "first_name": "Yarden",
        "last_name": "Harari",
        "email": "lsego1@theatlantic.com",
        "gender": "Female",
        "image": "https://robohash.org/sedquibusdamdistinctio.png?size=50x50&set=set1"
    },
    {
        "id": 3,
        "first_name": "Johnny",
        "last_name": "Marr",
        "email": "dganiford2@bizjournals.com",
        "gender": "Female",
        "image": "https://robohash.org/rerumnonest.png?size=50x50&set=set1"
    },
    {
        "id": 4,
        "first_name": "Noam",
        "last_name": "MacCallion",
        "email": "fmaccallion3@fastcompany.com",
        "gender": "Female",
        "image": "https://robohash.org/etsednihil.png?size=50x50&set=set1"
    },

]


const Trainers = ({classes}) => {

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>
                            <PushNotification icon/>
                        </TableCell>
                        <TableCell className={classes.tableHead}>First Name</TableCell>
                        <TableCell className={classes.tableHead}>Last Name</TableCell>
                        <TableCell className={classes.tableHead}>Email</TableCell>
                        <TableCell className={classes.tableHead}>Gender</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trainers.map(user => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                <Avatar alt={user.first_name} src={user.image}/>
                            </TableCell>
                            <TableCell className={classes.tableBody}>{user.first_name}</TableCell>
                            <TableCell className={classes.tableBody}>{user.last_name}</TableCell>
                            <TableCell className={classes.tableBody}>{user.email}</TableCell>
                            <TableCell className={classes.tableBody}>{user.gender}</TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(Trainers)
