import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Avatar, Switch, Typography} from "@material-ui/core";
import PushNotification from "../../../components/common/PushNotification";
import {Mutation} from "react-apollo";
import updateRoleMutation from "../../../graphql/user/mutation/update-role";
import {withStyles} from "@material-ui/styles";
import UserActionMenu from "../../../components/common/UserActionMenu";

const R = require("ramda");


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
    const [newRoles, setRoles] = React.useState([]);

    const handleChange = (user, mutation, _id) => {
        const {roles} = user
        let newRoles = ['user']
        roles.includes('admin') && newRoles.push('admin')
        !roles.includes('trainer') && newRoles.push('trainer')
        setRoles(newRoles);
        mutation({variables: {_id, roles: newRoles}})
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
                        <TableCell className={classes.tableHead}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length > 0 && users.map(user => {
                        let company = R.pathOr("", ['name'])(user.company)
                        const {_id} = user
                        return (

                            <TableRow key={user._id}>
                                <TableCell component="th" scope="row">
                                    <Avatar alt={user.first_name} src={user.image}/>
                                </TableCell>
                                <TableCell className={classes.tableBody}>{user.firstName} {user.lastName}</TableCell>
                                <TableCell className={classes.tableBody}>{user.email}</TableCell>
                                <TableCell
                                    className={classes.tableBody}>{company}</TableCell>
                                <TableCell className={classes.tableBody}>
                                    <Mutation mutation={updateRoleMutation}>
                                        {(updateRoleMutation, {loading, error}) => {
                                            return <Switch
                                                checked={state._id}
                                                name={_id}
                                                defaultChecked={user.roles.includes('trainer')}
                                                onChange={() => {
                                                    handleChange(user, updateRoleMutation, user._id)
                                                }}
                                                color="primary"
                                                inputProps={{'aria-label': 'primary checkbox'}}
                                            />
                                        }}

                                    </Mutation>
                                </TableCell>
                                <TableCell>
                                    <UserActionMenu user={user}/>
                                </TableCell>
                            </TableRow>
                        )
                    })
                    }
                </TableBody>
            </Table>
            {
                users.length === 0 && <div className={classes.message}>
                    <Typography variant={'h5'}>
                        There are no active users for this company.
                    </Typography>
                </div>
            }
        </Paper>
    );
}

export default withStyles(styles)(AllUsers)
