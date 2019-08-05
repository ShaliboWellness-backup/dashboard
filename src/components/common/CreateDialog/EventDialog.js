import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/styles';
import {DateTimePicker} from '@material-ui/pickers';
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import createEventMutation from "../../../graphql/event/mutation/create-event";
import getEventsQuery from "../../../graphql/event/query/event";
import updateEventMutation from "../../../graphql/event/mutation/update-event";


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

const EventDialog = (props) => {

    const {event} = props;
    console.log(event)

    const [values, setValues] = React.useState({
        title: event.title || '',
        instructor: event.instructor || '',
        location: event.location || '',
        totalSpots: event.totalSpots || '',
        description: event.description || '',
        image: event.image || '',
        date: event.date || new Date(),
    });


    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
        console.log(formData);
    };

    const handleSetDate = (date) => {
        setValues({...values, date});
    };

    const handleSubmit = () => {
        console.log(formData);
        props.handleClose();
    };

    const {classes} = props;

    const {
        title, instructor, location, totalSpots, description, image, date,
    } = values;

    const formData = {
        title, instructor, location, totalSpots, description, image, date,
    };

    const id = props.action === 'create' ? null : event.id
    const takenSpots = props.action === 'create' ? null : event.takenSpots


    return props.action === 'create' ? (
        <Mutation
            mutation={createEventMutation}
        >
            {createEvent => (
                <div>
                    <DialogTitle
                        id="form-dialog-title"> {props.action === 'create' ? 'Create ' : 'Edit '}
                        Event </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Here you can change the details of a specific event.
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
                                id="instructor"
                                label="Instructor"
                                className={classes.textField}
                                value={values.instructor}
                                onChange={handleChange('instructor')}
                                margin="normal"
                            />
                            <TextField
                                id="location"
                                label="Location"
                                className={classes.textField}
                                value={values.location}
                                onChange={handleChange('location')}
                                margin="normal"
                            />

                            <TextField
                                id="totalSpots"
                                label="Total Spots"
                                className={classes.textField}
                                value={values.totalSpots}
                                onChange={handleChange('totalSpots')}
                                margin="normal"
                            />
                            <DateTimePicker
                                autoOk
                                ampm={false}
                                value={values.date}
                                onChange={date => handleSetDate(date)}
                                label="Date & Time"
                                className={classes.textField}
                                style={{marginTop: 16}}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                className={classes.textField}
                                value={values.description}
                                onChange={handleChange('description')}
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
                        <Button
                            onClick={props.handleClose}
                            color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            createEvent({
                                variables: {
                                    title,
                                    instructor,
                                    location,
                                    date,
                                    image,
                                    takenSpots: 0,
                                    totalSpots: parseInt(totalSpots),
                                    description
                                }
                            })
                            props.handleClose()
                        }} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </div>
            )}
        </Mutation>

    ) : (
        <Mutation
            mutation={updateEventMutation}
        >
            {updateEvent => (
                <div>
                    <DialogTitle
                        id="form-dialog-title"> {props.action === 'create' ? 'Create ' : 'Edit '}
                        Event </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Here you can change the details of a specific event.
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
                                id="instructor"
                                label="Instructor"
                                className={classes.textField}
                                value={values.instructor}
                                onChange={handleChange('instructor')}
                                margin="normal"
                            />
                            <TextField
                                id="location"
                                label="Location"
                                className={classes.textField}
                                value={values.location}
                                onChange={handleChange('location')}
                                margin="normal"
                            />

                            <TextField
                                id="totalSpots"
                                label="Total Spots"
                                className={classes.textField}
                                value={values.totalSpots}
                                onChange={handleChange('totalSpots')}
                                margin="normal"
                            />
                            <DateTimePicker
                                autoOk
                                ampm={false}
                                value={values.date}
                                onChange={date => handleSetDate(date)}
                                label="Date & Time"
                                className={classes.textField}
                                style={{marginTop: 16}}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                className={classes.textField}
                                value={values.description}
                                onChange={handleChange('description')}
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
                        <Button
                            onClick={props.handleClose}
                            color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            console.log('trying to update')
                            console.log(event.id)
                            updateEvent({
                                variables: {
                                    id: event.id,
                                    title,
                                    instructor,
                                    location,
                                    date,
                                    image,
                                    takenSpots: 0,
                                    totalSpots: parseInt(totalSpots),
                                    description
                                }
                            })
                            props.handleClose()
                        }} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </div>
            )}
        </Mutation>
    );
};

export default withStyles(styles)(EventDialog);

EventDialog.defaultProps = {
    action: 'edit',
    event: {
        title: '',
        instructor: '',
        location: '',
        totalSpots: '',
        description: '',
        image: '',
        date: new Date(),
    }
};
