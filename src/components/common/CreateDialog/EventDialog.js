import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/styles';
import {DateTimePicker} from '@material-ui/pickers';
import createEventMutation from "../../../graphql/event/mutation/create-event";
import updateEventMutation from "../../../graphql/event/mutation/update-event";
import {useApolloClient} from '@apollo/react-hooks'
import CurrentCompanyContext from "../../../containers/CurrentCompany/CurrentCompanyContext";
import updateCompanyMutation from "../../../graphql/companies/mutation/update-company";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import usersQuery from "../../../graphql/user/query/users";
import SnackbarContext from "../../../containers/CustomSnackbar/SnackbarContext"

const R = require("ramda");


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

const EventDialog = (props) => {

    const client = useApolloClient()

    const {event} = props;
    console.log(event)

    const [values, setValues] = React.useState({
        title: !!event.title ? event.title : '',
        instructor: !!event.instructor ? event.instructor._id : '',
        location: !!event.location ? event.location : '',
        totalSpotsString: !!event.totalSpots ? event.totalSpots : '',
        description: !!event.description ? event.description : '',
        image: !!event.image ? event.image : '',
        date: !!event.date ? event.date : new Date(),
        trainers: []
    });

    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        getTrainers()

    }, []);

    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value});
        console.log(formData);
    };

    const handleSetDate = (date) => {
        setValues({...values, date});
    };

    const getTrainers = () => {
        client.query({
            query: usersQuery
        })
            .then(({data}) => {

                let trainers = data.users.filter(user => user.roles.includes('trainer'))
                setValues({...values, trainers})
                return null

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = () => {
        console.log(formData);
        props.handleClose();
    };

    const {classes} = props;
    const inputLabel = React.useRef(null);


    let {
        title, instructor, location, totalSpotsString, description, image, date,
    } = values;

    let totalSpots = parseInt(totalSpotsString)
    const formData = {
        title, instructor, location, totalSpots, description, image, date,
    };

    const takenSpots = props.action === 'create' ? 0 : event.takenSpots

    const variables = props.action === 'create' ? {...formData, takenSpots} : {...formData, _id: event._id}
    const mutation = props.action === 'create' ? createEventMutation : updateEventMutation

    console.log(variables)
    return (
        <CurrentCompanyContext.Consumer>
            {value => {
                const {currentCompany} = value
                return <div>
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
                                variant={"outlined"}
                            />
                            <FormControl variant="outlined" className={classes.selectInput}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                    Instructor
                                </InputLabel>
                                <Select
                                    MenuProps={{classes: {list: classes.test}}}
                                    value={values.instructor}
                                    onChange={handleChange('instructor')}
                                    input={<OutlinedInput labelWidth={labelWidth} name="instructor"
                                                          id="outlined-age-simple"/>}
                                >
                                    {values.trainers.length > 0 ? values.trainers.map((trainer) => (
                                            <MenuItem key={trainer._id}
                                                      value={trainer._id}>{trainer.firstName} {trainer.lastName}</MenuItem>
                                        )) :
                                        <MenuItem key={1} value={""}>No Available Trainers</MenuItem>
                                    }

                                </Select>
                            </FormControl>
                            <TextField
                                id="location"
                                label="Location"
                                className={classes.textField}
                                value={values.location}
                                onChange={handleChange('location')}
                                margin="normal"
                                variant={"outlined"}
                            />

                            <TextField
                                id="totalSpots"
                                label="Total Spots"
                                className={classes.textField}
                                value={values.totalSpotsString}
                                onChange={handleChange('totalSpotsString')}
                                margin="normal"
                                variant={"outlined"}
                                type={"number"}
                            />
                            <DateTimePicker
                                autoOk
                                ampm={false}
                                value={values.date}
                                onChange={date => handleSetDate(date)}
                                label="Date & Time"
                                className={classes.textField}
                                style={{marginTop: 16}}
                                inputVariant={"outlined"}

                            />
                            <TextField
                                id="image"
                                label="Image"
                                className={classes.textField}
                                value={values.image}
                                onChange={handleChange('image')}
                                margin="normal"
                                variant={"outlined"}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                fullWidth
                                className={classes.textField}
                                value={values.description}
                                onChange={handleChange('description')}
                                margin="normal"
                                variant={"outlined"}
                            />

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={props.handleClose}
                            color="primary">
                            Cancel
                        </Button>
                        <SnackbarContext.Consumer>
                            {value => {
                                return <Button onClick={() => {
                                    return variables.title === "" ||
                                    variables.instructor === "" ||
                                    variables.date === "" ||
                                    variables.location === "" ||
                                    variables.totalSpotsString === "" ||
                                    variables.description === "" ||
                                    variables.image === ""
                                        ?
                                        value.openSnackbar('error', 'Please make sure there are no empty fields')
                                        :
                                        client.mutate({
                                            mutation,
                                            variables
                                        })
                                            .then(async ({data, error}) => {
                                                props.action === 'edit' &&
                                                props.handleClose()
                                                props.action === 'create' &&
                                                client.mutate({
                                                    mutation: updateCompanyMutation,
                                                    variables: {
                                                        _id: currentCompany._id,
                                                        eventsIds: data.createEvent._id
                                                    }
                                                })
                                                    .then(({data, error}) => {
                                                        console.log("updated company with event")
                                                        props.handleClose()
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

            }}
        </CurrentCompanyContext.Consumer>

    )


};

export default withStyles(styles)(EventDialog);

EventDialog.defaultProps = {
    action: 'edit',
    event: {
        title: '',
        instructor: '',
        location: '',
        totalSpots: 10,
        description: '',
        image: '',
        date: new Date(),
    }
};
