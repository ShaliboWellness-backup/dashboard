import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/styles'
import {
    Button,
    Checkbox,
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
    useMediaQuery, useTheme
} from "@material-ui/core";
import SnackbarContext from "../../../containers/CustomSnackbar/SnackbarContext"
import { useApolloClient } from '@apollo/react-hooks'
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import updateTeamMutation from "../../../graphql/teams/mutation/update-team";
import getCompaniesQuery from "../../../graphql/companies/query/companies";

const R = require('ramda')


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
    checkbox: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: 16,
        width: 400,


    },
    test: {
        border: '1px solid #e0e0e0'
    }
});

function TeamDialog(props) {


    const { classes, closeMenu, team } = props
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
        name: team.name,
        company: { _id: "" },
    });

    const handleChange = name => (event) => {
        setValues({ ...values, [name]: event.target.value });
        console.log(values)
    };

    const inputLabel = React.useRef(null);

    const { _id } = team;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Fragment>
            <MenuItem onClick={() => handleClickOpen()}>
                <Typography variant={"body1"} color={"textSecondary"}>
                    Edit Team
                </Typography>
            </MenuItem>

            <Dialog fullScreen={fullScreen} maxWidth={"sm"} fullWidth scroll={"body"} open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
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


                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <SnackbarContext.Consumer>
                        {value => (
                            <Button onClick={() => {
                                const { name } = values
                                const variables = {
                                    _id,
                                    name
                                }

                                console.log(values)
                                console.log(variables)
                                return name === "" ?
                                    value.openSnackbar('error', 'Please make sure there are no empty fields')
                                    :
                                    client.mutate({
                                        mutation: updateTeamMutation,
                                        variables
                                    })
                                        .then(() => {
                                            handleClose()
                                            value.openSnackbar('success', 'User information updated successfully')
                                            //window.location.reload()
                                        })
                                        .catch((error) => {
                                            value.openSnackbar('error', `${!!error && error.message && error.message}`)
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

export default withStyles(styles)(TeamDialog);
