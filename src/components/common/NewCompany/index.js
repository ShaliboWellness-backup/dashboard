import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/styles'
import {Mutation} from "react-apollo";
import Add from '@material-ui/icons/Add'
import {
    DialogContent,
    DialogTitle,
    Dialog,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Button,
    DialogActions,
    TextField
} from "@material-ui/core";
import CreateCompanyMutation from "../../../graphql/companies/mutation/create-company"


const styles = () => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',


    },
    textField: {
        marginLeft: 8,
        marginRight: 8,
    },
});

function NewCompany({classes, closeMenu}) {

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
        emailSuffix: '',
        image: '',

    });


    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    return (
        <Fragment>
            <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                    <Add/>
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{variant: "body1", color: "textSecondary"}}
                    primary={"New Company"}/>
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
                            id="emailSuffix"
                            label="Email Suffix"
                            className={classes.textField}
                            value={values.emailSuffix}
                            onChange={handleChange('emailSuffix')}
                            margin="normal"
                            variant={"outlined"}
                            fullWidth={true}
                        />
                        <TextField
                            id="image"
                            label="Image"
                            className={classes.textField}
                            value={values.image}
                            onChange={handleChange('image')}
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
                    <Mutation mutation={CreateCompanyMutation}>
                        {createCompany => (
                            <Button onClick={async () => {
                                const {name, emailSuffix} = values

                                await createCompany({variables: {name, emailSuffix}})
                                handleClose()
                                window.location.reload()
                            }} color="primary">
                                OK
                            </Button>
                        )
                        }

                    </Mutation>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default withStyles(styles)(NewCompany);
