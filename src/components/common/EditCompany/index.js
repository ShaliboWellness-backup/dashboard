import React, {Fragment, useEffect} from 'react';
import {withStyles} from '@material-ui/styles'
import {useApolloClient} from '@apollo/react-hooks'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    TextField,
    useTheme,
    Grid, FormHelperText
} from "@material-ui/core";
import CreateCompanyMutation from "../../../graphql/companies/mutation/create-company"
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import updateCompanyMutation from "../../../graphql/companies/mutation/update-company";
import SnackbarContext from "../../../containers/CustomSnackbar/SnackbarContext"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {CSVLink} from "react-csv";
import updateAvailableCodes from "../../../graphql/companies/mutation/update-available-codes";
import RefreshButton from "../RefreshButton";


const styles = () => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',


    },
    textField: {
        marginLeft: 8,
        marginRight: 8,
    },
    textFieldDense: {
        marginLeft: 8,
        marginRight: 8,
    },
    selectInput: {
        marginLeft: 8,
        marginRight: 8,
        width: '100%',
        marginTop: 16,
        borderWidth: 1,
        borderColor: "black"
    },
    test: {
        border: '1px solid #e0e0e0'
    }
});

function EditCompany({classes, company}) {

    const [open, setOpen] = React.useState(false);

    const {openSnackbar} = React.useContext(SnackbarContext)

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
        codes: [],
        isPublic: true,
        quantity: 0
    });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
            // Update the document title using the browser API
            setValues({
                name: company.name,
                emailSuffix: company.emailSuffix,
                logo: company.logo,
                codes: company.codes,
                masterCode: !!company.masterCode ? company.masterCode : 'No Valid Code',
                isPublic: company.isPublic
            })
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

            <Dialog fullScreen={fullScreen} maxWidth={"xs"} scroll={"body"} open={open} onClose={handleClose}>
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
                        <FormControl variant="outlined" className={classes.selectInput}>
                            <InputLabel htmlFor="outlined-age-simple">
                                Public
                            </InputLabel>
                            <Select
                                MenuProps={{classes: {list: classes.test}}}
                                value={values.isPublic}
                                onChange={handleChange('isPublic')}
                                input={<OutlinedInput labelWidth={50} name="verified"
                                                      id="outlined-age-simple"/>}
                            >
                                <MenuItem key={1} value={true}>True</MenuItem>
                                <MenuItem key={2} value={false}>False</MenuItem>
                            </Select>
                        </FormControl>
                        <div style={{marginTop: 16}}>
                            <InputLabel>
                                Code Generator
                            </InputLabel>
                            <Grid container spacing={2} alignItems={"center"}>
                                <Grid item xs>
                                    <TextField
                                        id="quantity"
                                        label="Quantity"
                                        className={classes.textFieldDense}
                                        value={values.quantity}
                                        onChange={handleChange('quantity')}
                                        margin="normal"
                                        type={'number'}
                                        variant={"outlined"}
                                        fullWidth={true}
                                        margin={'dense'}
                                    />
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Button style={{height: '100%'}} fullWidth color={'primary'} variant={"contained"}
                                            onClick={() => {
                                                !values.quantity > 0 ?
                                                    openSnackbar('error', 'Quantity must be 1 or larger')
                                                    :
                                                    client.mutate({
                                                        mutation: updateAvailableCodes,
                                                        variables: {
                                                            companyId: company._id,
                                                            count: parseInt(values.quantity)
                                                        }
                                                    })
                                                        .then(() => {
                                                                return
                                                            }, error => {
                                                                console.log(error.graphQLErrors)
                                                            }
                                                        )
                                            }}>
                                        Generate
                                    </Button>

                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Button color={'primary'} variant={"contained"}
                                            disabled={!!values.codes && values.codes.length > 0 ? false : true}>
                                        <CSVLink style={{textDecoration: 'none', color: 'white'}}
                                                 filename={`user-codes-${values.name}.csv`}
                                                 data={!!values.codes && values.codes.map((code) => [code])}>Download</CSVLink>
                                    </Button>
                                </Grid>

                            </Grid>
                            <FormHelperText style={{display: 'flex', alignItems: 'center', minHeight: 25}}
                                            error={!!values.codes && values.codes.length > 0 ? false : true}>
                                Available Codes: {!!values.codes && values.codes.length} | Master: {values.masterCode}
                                <RefreshButton _id={company._id}/>
                            </FormHelperText>
                        </div>

                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <SnackbarContext.Consumer>
                        {value => {
                            return <Button onClick={() => {
                                const {name, emailSuffix, logo, isPublic} = values
                                return name === "" ||
                                emailSuffix === "" ||
                                logo === "" ?
                                    value.openSnackbar('error', 'Please make sure there are no empty fields')
                                    :
                                    client.mutate({
                                        mutation: updateCompanyMutation,
                                        variables: {_id: company._id, name, emailSuffix, logo, isPublic}
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
