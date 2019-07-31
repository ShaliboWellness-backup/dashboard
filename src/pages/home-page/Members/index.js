import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Avatar, Typography} from "@material-ui/core";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
        color: "black"
    },
})


const Members = ({classes, company}) => {

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:"inherit"}}> </TableCell>
                        <TableCell style={{color:"inherit"}}>First Name</TableCell>
                        <TableCell style={{color:"inherit"}}>Last Name</TableCell>
                        <TableCell style={{color:"inherit"}}>Email</TableCell>
                        <TableCell style={{color:"inherit"}}>Gender</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {company.users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">
                                        <Avatar alt={user.first_name} src={user.image} />
                                    </TableCell>

                                    <TableCell >{user.first_name}</TableCell>
                                    <TableCell >{user.last_name}</TableCell>
                                    <TableCell >{user.email}</TableCell>
                                    <TableCell >{user.gender}</TableCell>
                                </TableRow>
                            ))
                        }
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(Members)
