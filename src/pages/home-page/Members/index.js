import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Avatar, CircularProgress, Typography} from "@material-ui/core";
import PushNotification from "../../../components/common/PushNotification";
import {Query} from "react-apollo";
import getCompanyUsersQuery from "../../../graphql/companies/query/get-users";
import UserActionMenu from "../../../components/common/UserActionMenu";


const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 15,
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
        fontSize: "0.875rem",

    },
    message: {
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

})


const Members = ({classes, company}) => {

    return <Query query={getCompanyUsersQuery}
                  variables={company ? {_id: company._id} : {_id: "null"}}
    >
        {({loading, error, data}) => {
            if (loading) {
                return <div style={{width: "100%", textAlign: "center"}}>
                    <CircularProgress/>
                </div>
            }
            if (error) {
                console.log(error)
                return null
            }
            if (!loading && data && data.company) {
                const users = data.company.users

                return (
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHead}>
                                        <PushNotification icon/>
                                    </TableCell>
                                    <TableCell className={classes.tableHead}>Name</TableCell>
                                    <TableCell className={classes.tableHead}>Email</TableCell>
                                    <TableCell className={classes.tableHead}>Company</TableCell>
                                    <TableCell className={classes.tableHead}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.length > 0 &&

                                users.map(user => (
                                    <TableRow key={user._id}>
                                        <TableCell component="th" scope="row">
                                            <Avatar color={"primary"}>
                                                {user.firstName.charAt(0)}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableBody}>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell className={classes.tableBody}>{user.email}</TableCell>
                                        <TableCell
                                            className={classes.tableBody}>{!!user.company ? user.company.name : "bug"}</TableCell>
                                        <TableCell>
                                            <UserActionMenu user={user}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {users.length === 0 && <div className={classes.message}>
                            <Typography variant={'h5'}>
                                There are no active users for this company.
                            </Typography>
                        </div>}
                    </Paper>
                )
            } else {
                return <Typography variant={'h5'}>Error</Typography>
            }
        }
        }

    </Query>

}

export default withStyles(styles)(Members)
