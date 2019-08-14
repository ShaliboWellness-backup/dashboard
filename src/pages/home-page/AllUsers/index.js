import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Avatar, Typography, Switch} from "@material-ui/core";
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

const AllUsers = ({classes, users}) => {

    const [state, setState] = React.useState({});

    const handleChange = name => event => {
        setState({...state, [name]: event.target.checked});
    };

    return (
        <Paper className={classes.root}>
            <Typography variant={"h5"} style={{fontWeight: 100}}>
                All Users
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
                        <TableCell className={classes.tableHead}>Trainer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length > 0 && users.map(user => (
                        <TableRow key={user._id}>
                            <TableCell component="th" scope="row">
                                <Avatar alt={user.first_name} src={user.image}/>
                            </TableCell>
                            <TableCell className={classes.tableBody}>{user.name}</TableCell>
                            <TableCell className={classes.tableBody}>{user.email}</TableCell>
                            <TableCell className={classes.tableBody}>{user.company}</TableCell>
                            <TableCell className={classes.tableBody}>
                                <Switch
                                    checked={user.roles.includes('trainer')}
                                    onChange={handleChange(user._id)}
                                    color="primary"
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                /></TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
            {users.length === 0 && <div className={classes.message}>
                <Typography variant={'h5'}>
                    There are no active users for this company.
                </Typography>
            </div>}
        </Paper>
    );
}

export default withStyles(styles)(AllUsers)
