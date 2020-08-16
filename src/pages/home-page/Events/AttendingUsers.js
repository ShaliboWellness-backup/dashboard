import React, {useState, useEffect} from 'react';
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
import TableBody from "@material-ui/core/TableBody";
import Checkbox from '@material-ui/core/Checkbox'
import {ExpansionPanelActions, Switch} from "@material-ui/core";
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

export default function AttendingUsers({event, users, children, setVerifiedUsers, verifiedUsers}) {
    const classes = useStyles();

    const client = useApolloClient()

    const [verifying, setVerifying] = useState(false);

    function handleToggleUser(_id){
        if(verifiedUsers.includes(_id)){
            const tempVerified = verifiedUsers.filter(userId => userId !== _id)
            console.log(tempVerified)
            setVerifiedUsers(tempVerified);
        } else {
            setVerifiedUsers((prevState)=> ([...prevState, _id]))
        }
    }

    return (
        <ExpansionPanel style={verifying ?
            {pointerEvents: "none", opacity: "0.4" , transition: 'opacity 0.4s ease'} :
            {transition: 'opacity 0.4s ease'}}
                        classes={{root: classes.root}}>
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
                                <TableCell className={classes.tableHead}>Attended</TableCell>
                                <TableCell className={classes.tableHead}>Email</TableCell>
                                <TableCell className={classes.tableHead}>Remove</TableCell>

                                {/*<TableCell className={classes.tableHead}>Company</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 &&

                            users.map(user => {
                                const {_id} = user
                                return (
                                    <TableRow key={user._id}>
                                        <TableCell
                                            className={classes.tableBody}>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell className={classes.tableBody}>
                                            <Checkbox
                                                color={"primary"}
                                                checked={verifiedUsers.includes(_id)}
                                                onChange={() => handleToggleUser(_id)}
                                                value="checkedA"
                                                inputProps={{
                                                    'aria-label': 'primary checkbox',
                                                }}
                                            />
                                        </TableCell>
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

                                    </TableRow>
                                )
                            })}
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
