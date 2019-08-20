import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/styles'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    MenuItem,
    TextField,
    Typography,
    Checkbox
} from "@material-ui/core";
import CreateCompanyMutation from "../../../graphql/companies/mutation/create-company"
import SnackbarContext from "../../../containers/CustomSnackbar/SnackbarContext"
import {useApolloClient} from '@apollo/react-hooks'
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import updateUserMutation from "../../../graphql/user/mutation/update-user";
import usersQuery from "../../../graphql/user/query/users";
import getCompaniesQuery from "../../../graphql/companies/query/companies";


const styles = () => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',


    },
    textField: {
        marginLeft: 8,
        marginRight: 8,
        width: 200
    },
    selectInput: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: 16,
        width: 200,
        borderWidth: 1,
        borderColor: "black"
    },
    test: {
        border: '1px solid #e0e0e0'
    }
});

function UserDialog({classes, closeMenu, user}) {

    const client = useApolloClient()

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
        closeMenu()
    }

    function handleClose() {
        setOpen(false);
    }

    const [values, setValues] = React.useState({
        name: '',
        email: '',
        company: '',
        verified: '',
        roles: ['user'],
        companies: []

    });

    React.useEffect(() => {
        const {name, email, company, verified, roles} = user
        console.log(roles)
        setValues({...values, name, email, company, verified, roles})
        getCompanies()
    }, [user]);

    const getCompanies = () => {
        client.query({
            query: getCompaniesQuery
        })
            .then(({data}) => {

                const {companies} = data
                setValues({...values, companies})
                return null

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    const handleRoleChange = (role) => {
        let currentRoles = values.roles
        let newRoles
        if (currentRoles.includes(role)) {
            newRoles = currentRoles.filter(item => item !== role)
        } else {
            newRoles = currentRoles
            newRoles.push(role)
        }

        setValues({...values, roles: newRoles});
    };

    const inputLabel = React.useRef(null);

    console.log(values)
    return (
        <Fragment>
            <MenuItem onClick={() => handleClickOpen()}>
                <Typography variant={"body1"} color={"textSecondary"}>
                    Edit
                </Typography>
            </MenuItem>

            <Dialog maxWidth={"xs"} scroll={"body"} open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Create New Company</DialogTitle>
                <DialogContent>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange('name')}
                            margin="normal"
                            variant={"outlined"}
                            fullWidth={true}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            value={values.email}
                            onChange={handleChange('email')}
                            margin="normal"
                            variant={"outlined"}
                            fullWidth={true}
                        />
                        <FormControl variant="outlined" className={classes.selectInput}>
                            <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                Company
                            </InputLabel>
                            <Select
                                MenuProps={{classes: {list: classes.test}}}
                                value={values.company}
                                onChange={handleChange('company')}
                                input={<OutlinedInput labelWidth={60} name="company"
                                                      id="outlined-age-simple"/>}
                            >
                                {values.companies.length > 0 ? values.companies.map((company) => (
                                        <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
                                    )) :
                                    <MenuItem key={1} value={""}>No Available Companies</MenuItem>
                                }

                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.selectInput}>
                            <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                Verified
                            </InputLabel>
                            <Select
                                MenuProps={{classes: {list: classes.test}}}
                                value={values.verified}
                                onChange={handleChange('verified')}
                                input={<OutlinedInput labelWidth={60} name="verified"
                                                      id="outlined-age-simple"/>}
                            >
                                <MenuItem key={1} value={true}>True</MenuItem>
                                <MenuItem key={2} value={false}>False</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.selectInput}>
                            <FormLabel component="legend">Roles</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={values.roles.includes('user')}
                                                       onChange={() => handleRoleChange('user')} value="user"/>}
                                    label="User"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.roles.includes('trainer')}
                                                       onChange={() => handleRoleChange('trainer')} value="trainer"/>}
                                    label="Trainer"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={values.roles.includes('admin')}
                                                  onChange={() => handleRoleChange('admin')} value="admin"/>
                                    }
                                    label="Admin"
                                />
                            </FormGroup>
                            <FormHelperText>Be careful</FormHelperText>
                        </FormControl>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <SnackbarContext.Consumer>
                        {value => (
                            <Button onClick={() => {
                                const {name, email, company, roles, verified} = values
                                const variables = {_id: user._id, name, email, company, roles, verified}
                                console.log(variables)
                                return name === "" ||
                                email === "" ||
                                company === "" ||
                                roles.length === 0 ?
                                    value.openSnackbar('error', 'Please make sure there are no empty fields')
                                    :
                                    client.mutate({
                                        mutation: updateUserMutation,
                                        variables
                                    })
                                        .then(() => {
                                            handleClose()
                                            window.location.reload()
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                        })
                            }} color="primary">
                                OK
                            </Button>
                        )
                        }

                    </SnackbarContext.Consumer>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default withStyles(styles)(UserDialog);
