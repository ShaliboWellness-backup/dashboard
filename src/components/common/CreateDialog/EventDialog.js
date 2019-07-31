import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/styles';
import {DateTimePicker} from '@material-ui/pickers';
import CreateDialog from "./index";


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
    

    const [values, setValues] = React.useState({
        title: event.title || '',
        instructor: event.instructor || '',
        building: event.location.building || '',
        room: event.location.room || '',
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
        title, instructor, building, room, totalSpots, description, image, date,
    } = values;

    const formData = {
        title, instructor, building, room, totalSpots, description, image, date,
    };

    return (
        <div>
            <DialogTitle id="form-dialog-title">{props.action === 'create' ? 'Create' : 'Edit'} Event</DialogTitle>
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
                        id="building"
                        label="Building"
                        className={classes.textField}
                        value={values.building}
                        onChange={handleChange('building')}
                        margin="normal"
                    />
                    <TextField
                        id="room"
                        label="Room"
                        className={classes.textField}
                        value={values.room}
                        onChange={handleChange('room')}
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
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    OK
                </Button>
            </DialogActions>
        </div>
    );
};

export default withStyles(styles)(EventDialog);

EventDialog.defaultProps = {
    action: 'edit',
    event: {
        title: '',
        instructor: '',
        location: {
            building: "",
            room: ""
        },
        totalSpots: '',
        description: '',
        image: '',
        date: new Date(),
    }
};
