import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Avatar, Switch, Typography, TextField, Button, CircularProgress} from "@material-ui/core";
import PushNotification from "../../../components/common/PushNotification";
import {Mutation} from "react-apollo";
import updateRoleMutation from "../../../graphql/user/mutation/update-role";
import {withStyles} from "@material-ui/styles";
import UserActionMenu from "../../../components/common/UserActionMenu";
import {stringToColor} from "../../../utils/random-color";
import {useApolloClient} from '@apollo/react-hooks'
import {useQuery} from '@apollo/react-hooks'
import usersQuery from "../../../graphql/user/query/users";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme'
import searchUsersQuery from "../../../graphql/user/query/search-users";
import {Scrollbars} from "react-custom-scrollbars";
import CreateUserDialog from "../../../components/common/CreateUserDialog";


const R = require("ramda");


const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 15,
        height: 'calc(100vh - 100px)',
    },
    table: {
        //minWidth: 600,

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
    dense: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    searchbar: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',

    },
    message: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32
    }

})

const AllUsers = ({classes}) => {

    const client = useApolloClient()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [moreToLoad, setMoreToLoad] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({});
    const [newRoles, setRoles] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [filterValues, setFilterValues] = React.useState({
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        offset: 0,
        limit: 50,
    });

    React.useEffect(() => {
        client.watchQuery({
            query: searchUsersQuery,
            variables: {...filterValues, offset: 0},
        })
            .subscribe(({data}) => {
                if (!!data.searchUsers) {
                    setUsers(data.searchUsers)
                    data.searchUsers.length < 50 ? setMoreToLoad(false) : setMoreToLoad(true)
                } else {
                    return undefined
                }
                setLoading(false)

            }, (error) => {
                console.log(error)
            })
    }, [filterValues.firstName, filterValues.lastName, filterValues.email, filterValues.phone, filterValues.limit])


    React.useEffect(() => {
        filterValues.offset > 0 &&
        client.watchQuery({
            query: searchUsersQuery,
            variables: filterValues,

        })
            .subscribe(({data}) => {
                if (!!data.searchUsers) {
                    setUsers([...users, ...data.searchUsers])
                    data.searchUsers.length < 50 ? setMoreToLoad(false) : setMoreToLoad(true)
                } else {
                    return undefined
                }
                setLoading(false)

            }, (error) => {
                console.log(error)
            })

    }, [filterValues.offset])


    const handleFilterChange = name => (event) => {
        setFilterValues({...filterValues, offset: 0, [name]: event.target.value});
        console.log(filterValues)
    };

    const handleChange = (user, mutation, _id) => {
        const {roles} = user
        let newRoles = ['user']
        roles.includes('admin') && newRoles.push('admin')
        !roles.includes('trainer') && newRoles.push('trainer')
        setRoles(newRoles);
        mutation({variables: {_id, roles: newRoles}})
    };

    const handleRefetch = async () => {
        await setFilterValues({...filterValues, limit: 49})
        setFilterValues({...filterValues, limit: 50})
    }


    return (
        <Paper className={classes.root}>
            <Typography variant={"h5"} style={{fontWeight: 100, marginLeft: 8}}>
                All Users
            </Typography>
            <div className={classes.searchbar}>

                <TextField
                    id="outlined-dense"
                    label="First Name"
                    className={classes.dense}
                    value={filterValues.firstName}
                    style={{width: isMobile ? '100%' : 175}}
                    margin="dense"
                    variant="outlined"
                    onChange={handleFilterChange('firstName')}
                />
                <TextField
                    id="outlined-dense"
                    label="Last Name"
                    value={filterValues.lastName}
                    style={{width: isMobile ? '100%' : 175}}
                    className={classes.dense}
                    margin="dense"
                    variant="outlined"
                    onChange={handleFilterChange('lastName')}
                />
                <TextField
                    id="outlined-dense"
                    label="Email"
                    value={filterValues.email}
                    style={{width: isMobile ? '100%' : 175}}
                    className={classes.dense}
                    margin="dense"
                    variant="outlined"
                    onChange={handleFilterChange('email')}
                />
                <TextField
                    id="outlined-dense"
                    label="Phone"
                    value={filterValues.phone}
                    style={{width: isMobile ? '100%' : 175}}
                    className={classes.dense}
                    margin="dense"
                    variant="outlined"
                    onChange={handleFilterChange('phone')}
                />
                <CreateUserDialog refetch={handleRefetch}/>
            </div>
            <Scrollbars
                autoHeight
                autoHeightMin={300}
                autoHeightMax={340}
                autoHide
                style={{width: '100%'}}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>
                                <PushNotification icon/>
                            </TableCell>
                            <TableCell className={classes.tableHead}>Name</TableCell>
                            <TableCell className={classes.tableHead}>Email</TableCell>
                            <TableCell className={classes.tableHead}>Phone</TableCell>
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
                                        {!!user.image ?
                                            <Avatar alt={user.first_name} src={user.image}/>
                                            :
                                            <Avatar
                                                style={{backgroundColor: stringToColor(user.firstName)}}> {user.firstName[0]}</Avatar>
                                        }
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableBody}>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell className={classes.tableBody}>{user.email}</TableCell>
                                    <TableCell className={classes.tableBody}>{user.phone}</TableCell>
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
                                        <UserActionMenu user={user} refetch={handleRefetch}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>

                {
                    (users.length === 0 && loading) && <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                        <CircularProgress/>
                    </div>
                }

                {
                    (users.length === 0 && !loading) && <div className={classes.message}>
                        <Typography variant={'h5'}>
                            There are no active users for this company.
                        </Typography>
                    </div>
                }
            </Scrollbars>
            <div style={{width: '100%', textAlign: 'center'}}>
                <Button disabled={!moreToLoad} onClick={() => {
                    setFilterValues({...filterValues, offset: filterValues.offset + 50})
                    console.log(filterValues)
                }}>{moreToLoad ? 'Show More' : 'Showing All Users'}
                </Button>
            </div>
        </Paper>
    );
}

export default withStyles(styles)(AllUsers)
