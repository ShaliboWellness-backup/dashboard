import React, {Fragment, useEffect} from 'react';
import {withStyles} from '@material-ui/styles'
import {useApolloClient} from '@apollo/react-hooks'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField} from "@material-ui/core";
import CreateCompanyMutation from "../../../graphql/companies/mutation/create-company"
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import updateCompanyMutation from "../../../graphql/companies/mutation/update-company";
import SnackbarContext from "../../../containers/CustomSnackbar/SnackbarContext"


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

function EditCompany({classes, company}) {

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [values, setValues] = React.useState({
        name: "",
        emailSuffix: "",
        logo: "",
    });

    useEffect(() => {
            // Update the document title using the browser API
            setValues({name: company.name, emailSuffix: company.emailSuffix, logo: company.logo})
        }, [company]
    )
    ;

    const client = useApolloClient()

    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    return (
        <Fragment>
            <Tooltip TransitionComponent={Zoom} title="Edit Company">
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickOpen}>
                    <MoreVertIcon style={{color: "white"}} color={"secondary"}/>
                </IconButton>
            </Tooltip>

            <Dialog maxWidth={"xs"} scroll={"body"} open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit Company Info</DialogTitle>
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
                            id="logo"
                            label="Logo"
                            className={classes.textField}
                            value={values.logo}
                            onChange={handleChange('logo')}
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
                        {value => {
                            return <Button onClick={() => {
                                const {name, emailSuffix, logo} = values
                                return name === "" ||
                                emailSuffix === "" ||
                                logo === "" ?
                                    value.openSnackbar('error', 'Please make sure there are no empty fields')
                                    :
                                    client.mutate({
                                        mutation: updateCompanyMutation,
                                        variables: {_id: company._id, name, emailSuffix, logo}
                                    }).then(() => {
                                        handleClose()
                                        window.location.reload()
                                    })
                                        .catch((error) => {
                                            console.log(error)
                                        })

                            }} color="primary">
                                OK
                            </Button>

                        }}

                    </SnackbarContext.Consumer>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

EditCompany.defaultProps = ({
    company: {name: "", emailSuffix: "", logo: ""}
})


export default withStyles(styles)(EditCompany);
