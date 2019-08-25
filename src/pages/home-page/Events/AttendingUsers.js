import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PushNotification from "../../../components/common/PushNotification";
import TableBody from "@material-ui/core/TableBody";
import {Avatar, ExpansionPanelActions} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import {useApolloClient} from "@apollo/react-hooks";
import updateEventMutation from '../../../graphql/event/mutation/update-event';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        boxShadow: 'none',
        border: 'none',
        marginTop: 16
    },
    table: {
        marginTop: 0,


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

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export default function AttendingUsers({event, users, children}) {
    const classes = useStyles();

    const client = useApolloClient()

    React.useEffect(() => {
        return undefined
    }, [users]);

    return (
        <ExpansionPanel classes={{root: classes.root}}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={"subtitle2"} className={classes.heading}>Attending Members</Typography>

            </ExpansionPanelSummary>
            <ExpansionPanelActions style={{display: 'flex', justifyContent: 'flex-start'}}>
                {children}
            </ExpansionPanelActions>
            <ExpansionPanelDetails style={{minHeight: 125}}>
                {users.length > 0 ?
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead}>Name</TableCell>
                                <TableCell className={classes.tableHead}>Email</TableCell>
                                <TableCell className={classes.tableHead}>Remove</TableCell>
                                {/*<TableCell className={classes.tableHead}>Company</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 &&

                            users.map(user => (
                                <TableRow key={user._id}>
                                    <TableCell
                                        className={classes.tableBody}>  {user.name}</TableCell>
                                    <TableCell className={classes.tableBody}>{user.email}</TableCell>
                                    <TableCell className={classes.tableBody}>
                                        <Button onClick={() => {
                                            const updatedUsers = event.users.filter((value) => value._id !== user._id);
                                            client.mutate({
                                                mutation: updateEventMutation,
                                                variables: {
                                                    _id: event._id,
                                                    users: updatedUsers.map((user) => user._id)
                                                }
                                            }).then(value => {
                                                console.log('Success')
                                            });
                                        }} color="primary">
                                            Remove
                                        </Button>
                                    </TableCell>
                                    {/*<TableCell className={classes.tableBody}>{user.company.name}</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : <div className={classes.message}>
                        <Typography variant={'body1'}>
                            There are no active users for this event.
                        </Typography>
                    </div>}
            </ExpansionPanelDetails>
        </ExpansionPanel>

    );
}
