import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Divider, Box, IconButton, Avatar, Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PushNotification from '../../../components/common/PushNotification';
import { stringToColor } from '../../../utils/random-color';
import TeamActionMenu from '../../../components/common/TeamActionMenu';
import TeamsActionMenu from '../../../components/common/TeamsActionMenu';
import TeamUserActionMenu from '../../../components/common/TeamUserActionMenu';

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
  noUsersDiv: {
    width: 'fit-content',
    margin: '0 auto',
    fontWeight: 'bold',
  },

});

const Teams = ({ classes, teams, currentCompany }) => (
  <Paper className={classes.root}>
    <Box style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}
    >
      <TeamsActionMenu currentCompany={currentCompany} />
      <Typography variant="h5" style={{ fontWeight: 100 }}>
        Teams
      </Typography>
    </Box>
    {
      teams.map((team) => (
        <Box>
          <Divider />
          <Table className={classes.table}>

            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>
                  <Box style={{
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  >
                    <TeamActionMenu team={team} />
                    Team {team.name}
                  </Box>
                </TableCell>
              </TableRow>
              {
                team.users.length
                  ? (
                    <TableRow>
                      <TableCell className={classes.tableHead} />
                      <TableCell className={classes.tableHead}>Name</TableCell>
                      <TableCell className={classes.tableHead}>Total Steps</TableCell>
                      <TableCell className={classes.tableHead}>Email</TableCell>
                      <TableCell className={classes.tableHead}>Phone</TableCell>
                      <TableCell className={classes.tableHead}>Actions</TableCell>

                    </TableRow>
                  )
                  : <Typography className={classes.noUsersDiv}>No team members</Typography>
              }
            </TableHead>
            <TableBody>
              {
                team.users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {user.image
                        ? <Avatar alt={user.first_name} src={user.image} />
                        : (
                          <Avatar
                            style={{ backgroundColor: stringToColor(user.firstName) }}
                          > {user.firstName[0]}
                          </Avatar>
                        )}
                    </TableCell>
                    <TableCell className={classes.tableBody}>{user.firstName} {user.lastName}</TableCell>
                    <TableCell className={classes.tableBody}>{user.steps}</TableCell>
                    <TableCell className={classes.tableBody}>{user.email}</TableCell>
                    <TableCell className={classes.tableBody}>{user.phone}</TableCell>
                    <TableCell className={classes.tableBody}>
                      <TeamUserActionMenu team={team} user={user} />
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Box>
      ))
    }

  </Paper>
);

export default withStyles(styles)(Teams);
