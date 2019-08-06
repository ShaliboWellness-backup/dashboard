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
import {Mutation} from "react-apollo"


const styles = () => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 8,
        marginRight: 8,
        width: 200,
    },
});
const PromotionDialog = (props) => {
    const {promotion} = props;

    const [values, setValues] = React.useState({
        title: promotion.title || '',
        subtitle: promotion.subtitle || '',
        price: promotion.price || '',
        tag: promotion.tag || '',
        image: promotion.image || '',


    });


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
        title, subtitle, price, tag, image, id,
    } = values;

    const formData = {
        title, subtitle, price, tag, image, id,
    };

    const variables = props.action === 'create' ? {...formData} : {...formData, id: promotion.id}
    const mutation = props.action === 'create' ? createPromotionMutation : updatePromotionMutation


    return (
        <div>
            <DialogTitle id="form-dialog-title">{props.action === 'create' ? 'Create' : 'Edit'} Promotion</DialogTitle>
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
                    />
                    <TextField
                        id="subtitle"
                        label="Subtitle"
                        className={classes.textField}
                        value={values.subtitle}
                        onChange={handleChange('subtitle')}
                        margin="normal"
                    />
                    <TextField
                        id="price"
                        label="Price"
                        className={classes.textField}
                        value={values.price}
                        onChange={handleChange('price')}
                        margin="normal"
                    />
                    <TextField
                        id="tag"
                        label="Tag"
                        className={classes.textField}
                        value={values.tag}
                        onChange={handleChange('tag')}
                        margin="normal"
                    />
                    <TextField
                        id="image"
                        label="Image"
                        className={classes.textField}
                        value={values.image}
                        onChange={handleChange('image')}
                        margin="normal"
                    />

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Mutation mutation={mutation}>
                    {mutationFunction => (
                        <Button onClick={async () => {
                            console.log(variables)
                            await mutationFunction({variables: variables})
                            props.handleClose()
                            window.location.reload()
                        }} color="primary">
                            OK
                        </Button>
                    )}

                </Mutation>
            </DialogActions>
        </div>
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
