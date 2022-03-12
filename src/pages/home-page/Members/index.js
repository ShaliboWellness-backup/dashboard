import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, CircularProgress, Typography } from '@material-ui/core';
import { Query } from '@apollo/client/react/components';
import PushNotification from '../../../components/common/PushNotification';
import getCompanyUsersQuery from '../../../graphql/companies/query/get-users';
import UserActionMenu from '../../../components/common/UserActionMenu';
import { stringToColor } from '../../../utils/random-color';

const styles = (theme) => ({
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
        color: '#222a42b3',
        fontSize: '0.875rem',
    },
    tableBody: {
        fontWeight: 400,
        color: '#222a42b3',
        fontSize: '0.875rem',

    },
    message: {
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

const Members = ({ classes, company }) => {
    const [refetch, setRefetch] = React.useState(0);

    React.useEffect(() => undefined, [refetch]);

    const handleRefetch = async () => {

    };

    return (
        <Query
            query={getCompanyUsersQuery}
            pollInterval={5000}
            variables={company ? { _id: company._id } : { _id: 'null' }}
        >
            {({ loading, error, data }) => {
                if (loading) {
                    return (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <CircularProgress />
                        </div>
                    );
                }
                if (error) {
                    console.log(error);
                    return null;
                }
                if (!loading && data && data.company) {
                    const { users } = data.company;

                    return (
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableHead}>
                                            <PushNotification icon />
                                        </TableCell>
                                        <TableCell className={classes.tableHead}>Name</TableCell>
                                        <TableCell className={classes.tableHead}>Email</TableCell>
                                        <TableCell className={classes.tableHead}>Phone</TableCell>
                                        <TableCell className={classes.tableHead}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users && users.length > 0
                                        && users.filter(user => user.firstName.length).map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell component="th" scope="row">
                                                    <Avatar style={{ backgroundColor: stringToColor(user.firstName) }}>
                                                        {user.firstName.charAt(0)}
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell
                                                    className={classes.tableBody}
                                                >{user.firstName} {user.lastName}
                                                </TableCell>
                                                <TableCell className={classes.tableBody}>{user.email}</TableCell>
                                                <TableCell className={classes.tableBody}>
                                                    {user.phone}
                                                </TableCell>
                                                <TableCell>
                                                    <UserActionMenu user={user} refetch={handleRefetch} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {users.length === 0 && (
                                <div className={classes.message}>
                                    <Typography variant="h5">
                                        There are no active users for this company.
                                    </Typography>
                                </div>
                            )}
                        </Paper>
                    );
                }
                return <Typography variant="h5">Error</Typography>;
            }}

        </Query>
    );
};

export default withStyles(styles)(Members);
