import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/styles';
import createPromotionMutation from "../../../graphql/promotion/mutation/create-promotion";
import updatePromotionMutation from "../../../graphql/promotion/mutation/update-promotion";
import CurrentCompanyContext from "../../../containers/CurrentCompany/CurrentCompanyContext";
import updateCompanyMutation from "../../../graphql/companies/mutation/update-company";
import {useApolloClient} from '@apollo/react-hooks'
import SnackbarContext from "../../../containers/CustomSnackbar/SnackbarContext"
import CSVReader from "react-csv-reader";
import {InputBase, InputLabel, OutlinedInput} from "@material-ui/core";


const styles = (theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: 8,
            marginRight: 8,
            width: 200,
        },
        upload: {
            padding: '18.5px 14px',
            marginLeft: 8,
            marginRight: 8,
            marginTop: 16,
            marginBottom: 8,
            border: '1px solid #c7c7c7',
            borderRadius: 5,
            width: 200,
            height: 56,
            overflow: 'hidden'


        }
    })
;
const PromotionDialog = (props) => {
    const {promotion} = props;

    const [values, setValues] = React.useState({
        title: promotion.title || '',
        subtitle: promotion.subtitle || '',
        price: promotion.price || '',
        tag: promotion.tag || '',
        image: promotion.image || '',
        codes: []


    });

    const client = useApolloClient()


    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
        console.log(variables)
    };

    const handleSubmit = () => {
        console.log(formData);
        props.handleClose();
    };


    const {classes} = props;

    const {
        title, subtitle, price, tag, image, codes
    } = values;

    const formData = {
        title, subtitle, price, tag, image, codes
    };

    const handleCodesUpload = data => {
        let newCodes = values.codes
        data.map((largeArray) => {
            largeArray.map((code) => {
                newCodes.push(code)
            })
        })

        setValues({...values, codes: newCodes})
    };

    const variables = props.action === 'create' ? {...formData} : {...formData, _id: promotion._id}
    const mutation = props.action === 'create' ? createPromotionMutation : updatePromotionMutation

    return (
        <CurrentCompanyContext.Consumer>
            {value => {
                const {currentCompany} = value
                return (
                    <div>
                        <DialogTitle
                            id="form-dialog-title">{props.action === 'create' ? 'Create' : 'Edit'} Promotion</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Here you can change the details of a specific promotion.
                                Please note that changes will be visible to all relevant users once submitted.
                            </DialogContentText>
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    id="title"
                                    label="Title"
                                    className={classes.textField}
                                    value={values.title}
                                    onChange={handleChange('title')}
                                    margin="normal"
                                    variant={"outlined"}

                                />
                                <TextField
                                    id="subtitle"
                                    label="Subtitle"
                                    className={classes.textField}
                                    value={values.subtitle}
                                    onChange={handleChange('subtitle')}
                                    margin="normal"
                                    variant={"outlined"}
                                />
                                <TextField
                                    id="price"
                                    label="Price"
                                    className={classes.textField}
                                    value={values.price}
                                    onChange={handleChange('price')}
                                    margin="normal"
                                    variant={"outlined"}
                                />
                                <TextField
                                    id="tag"
                                    label="Tag"
                                    className={classes.textField}
                                    value={values.tag}
                                    onChange={handleChange('tag')}
                                    margin="normal"
                                    variant={"outlined"}
                                />
                                <TextField
                                    id="image"
                                    label="Image"
                                    className={classes.textField}
                                    value={values.image}
                                    onChange={handleChange('image')}
                                    margin="normal"
                                    variant={"outlined"}
                                    required
                                />
                                <div>
                                    <CSVReader
                                        cssClass={classes.upload}
                                        onFileLoaded={handleCodesUpload}
                                    />
                                    <InputLabel style={{marginLeft: 8}}>Upload Codes
                                        CSV
                                        ({!!promotion.codes && promotion.codes.length > 1 ? `${promotion.codes.length} codes left` : 'No available codes'})</InputLabel>
                                </div>


                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.handleClose} color="primary">
                                Cancel
                            </Button>
                            <SnackbarContext.Consumer>
                                {value => {
                                    return <Button onClick={() => {
                                        return variables.title === "" || variables.subtitle === "" ||
                                        variables.price === "" || variables.tag === "" || variables.image === "" ?
                                            value.openSnackbar('error', 'Please make sure there are no empty fields')
                                            :
                                            client.mutate({
                                                mutation,
                                                variables,
                                            })
                                                .then(async ({data, error}) => {
                                                    props.action === 'edit' &&
                                                    props.handleClose()
                                                    //window.location.reload()
                                                    props.action === 'create' &&
                                                    client.mutate({
                                                        mutation: updateCompanyMutation,
                                                        variables: {
                                                            _id: currentCompany._id,
                                                            promotionsIds: data.createPromotion._id
                                                        }
                                                    })
                                                        .then(({data, error}) => {
                                                            console.log("updated company with promotion")
                                                            props.handleClose()
                                                            // window.location.reload()
                                                        })
                                                        .catch((error) => {
                                                            console.log(error)
                                                        })
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
                    </div>
                )
            }}
        </CurrentCompanyContext.Consumer>
    );
};

export default withStyles(styles)(PromotionDialog);


PromotionDialog.defaultProps = {
    action: 'edit',
    promotion: {
        title: '',
        subtitle: '',
        price: '',
        tag: '',
        image: '',
        id: '',
    }
};
