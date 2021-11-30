import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';
import { DateTimePicker } from '@material-ui/pickers';
import { useApolloClient } from '@apollo/client';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SnackbarContext from '../../../containers/CustomSnackbar/SnackbarContext';
import trainersQuery from '../../../graphql/user/query/trainers';
import updateCompanyMutation from '../../../graphql/companies/mutation/update-company';
import CurrentCompanyContext from '../../../containers/CurrentCompany/CurrentCompanyContext';
import updateEventMutation from '../../../graphql/event/mutation/update-event';
import createEventMutation from '../../../graphql/event/mutation/create-event';
import { DurationPicker } from 'material-duration-picker';
import { formatDuration } from 'date-fns';

const R = require('ramda');

const SIXTY_MIN = 60;

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
    borderColor: 'black',
  },
  test: {
    border: '1px solid #e0e0e0',
  },
});

const EventDialog = (props) => {
  const client = useApolloClient();

  const { event } = props;

  const { currentCompany } = React.useContext(CurrentCompanyContext);

  const [values, setValues] = React.useState({
    title: event.title ? event.title : '',
    style: event.style ? event.style : '',
    instructor: event.instructor ? event.instructor._id : '',
    location: event.location ? event.location : '',
    totalSpotsString: event.totalSpots ? event.totalSpots : '',
    description: event.description ? event.description : '',
    image: event.image ? event.image : '',
    date: event.date ? event.date : new Date(),
    dateEnd: event.dateEnd ? event.dateEnd : new Date(),
    duration: event.duration ? event.duration : SIXTY_MIN,
    coinsString: event.coins ? event.coins : '15',
    enablePush: props.action === 'create' ? true : event.enablePush,
    isLive: props.action === 'create' ? false : event.isLive,
    zoomUrl: props.action === 'create' ? null : event.zoomUrl,
    trainers: [],
    company: ''
  });

  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    getTrainers();
  }, []);

  React.useEffect(() => {
    if (!currentCompany || !currentCompany._id) return;
    setValues({ ...values, company: currentCompany._id });
  }, [currentCompany]);

  const cloundinaryWidgetRef = React.useRef(undefined);

  const cloudniaryBtnCallback = (e) => {
    e.preventDefault();
    if (!cloundinaryWidgetRef.current) return;
    cloundinaryWidgetRef.current.open();
  };

  React.useEffect(() => {
    if (!window.cloudinary || cloundinaryWidgetRef.current) return;

    cloundinaryWidgetRef.current = window.cloudinary.createUploadWidget({
      cloudName: 'djxrfd5tp',
      uploadPreset: 'hsnb1qsi',
      multiple: false,
      maxImageWidth: 1024,
      maxImageHeight: 1024
    }, (error, result) => {
      if (error || !result || result.event !== 'success') return;
      console.log('Done! Here is the image info: ', result.info);
      setValues((prevValues) => ({
        ...prevValues,
        image: result.info.secure_url,
      }));
    });
  }, [window.cloudinary]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    console.log(values);
  };

  const handleCheckboxChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleSetDate = (date) => {
    setValues({ ...values, date });
  };

  const handleSetDateEnd = (date) => {
    setValues({ ...values, dateEnd: date });
  };

  const getTrainers = () => {
    client.query({
      query: trainersQuery,
    })
      .then(({ data }) => {
        const trainers = data.trainers.filter((user) => user.roles.includes('trainer'));
        setValues({ ...values, trainers });
        return null;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    console.log(formData);
    props.handleClose();
  };

  const { classes } = props;
  const inputLabel = React.useRef(null);

  const availableStyles = ['pilates', 'strength', 'wellness', 'yoga'];

  const {
    title,
    style,
    instructor,
    location,
    totalSpotsString,
    coinsString,
    description,
    image,
    date,
    dateEnd,
    duration,
    enablePush,
    isLive,
    zoomUrl,
  } = values;

  const totalSpots = parseInt(totalSpotsString);
  const coins = parseInt(coinsString);
  const formData = {
    title,
    style,
    instructor,
    location,
    totalSpots,
    coins,
    description,
    image,
    date,
    enablePush,
    isLive,
    zoomUrl,
    dateEnd,
    duration,
    company: currentCompany?._id || '',
  };

  const takenSpots = props.action === 'create' ? 0 : event.takenSpots;

  const variables = props.action === 'create' ? { ...formData, takenSpots } : { ...formData, _id: event._id };
  const mutation = props.action === 'create' ? createEventMutation : updateEventMutation;

  console.log({ formData, values, variables });
  return (
    <CurrentCompanyContext.Consumer>
      {(value) => {
        const { currentCompany } = value;
        return (
          <div>
            <DialogTitle
              id="form-dialog-title"
            > {props.action === 'create' ? 'Create ' : 'Edit '}
              Event
            </DialogTitle>
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
                  variant="outlined"
                />
                <FormControl variant="outlined" className={classes.selectInput}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Instructor
                  </InputLabel>
                  <Select
                    MenuProps={{ classes: { list: classes.test } }}
                    value={values.instructor}
                    onChange={handleChange('instructor')}
                    input={(
                      <OutlinedInput
                        labelWidth={labelWidth}
                        name="instructor"
                        id="outlined-age-simple"
                      />
                    )}
                  >
                    {values.trainers.length > 0 ? values.trainers.map((trainer) => (
                      <MenuItem
                        key={trainer._id}
                        value={trainer._id}
                      >{trainer.firstName} {trainer.lastName}
                      </MenuItem>
                    ))
                      : <MenuItem key={1} value="">No Available Trainers</MenuItem>}

                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.selectInput}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Style
                  </InputLabel>
                  <Select
                    MenuProps={{ classes: { list: classes.test } }}
                    value={style}
                    onChange={handleChange('style')}
                    input={(
                      <OutlinedInput
                        labelWidth={labelWidth}
                        name="Style"
                        id="outlined-age-simple"
                      />
                    )}
                  >
                    {availableStyles.length > 0 ? availableStyles.map((style) => (
                      <MenuItem
                        key={style}
                        value={style}
                      >{style}
                      </MenuItem>
                    ))
                      : <MenuItem key={1} value="">No Available Styles</MenuItem>}

                  </Select>
                </FormControl>

                <TextField
                  id="location"
                  label="Location"
                  className={classes.textField}
                  value={values.location}
                  onChange={handleChange('location')}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  id="totalSpots"
                  label="Total Spots"
                  className={classes.textField}
                  value={values.totalSpotsString}
                  onChange={handleChange('totalSpotsString')}
                  margin="normal"
                  variant="outlined"
                  type="number"
                />
                <TextField
                  id="coins"
                  label="Coins"
                  className={classes.textField}
                  value={values.coinsString}
                  onChange={handleChange('coinsString')}
                  margin="normal"
                  variant="outlined"
                  type="number"
                />
                <DateTimePicker
                  autoOk
                  ampm={false}
                  value={values.date}
                  onChange={(date) => handleSetDate(date)}
                  label="Date & Time"
                  className={classes.textField}
                  style={{ marginTop: 16 }}
                  inputVariant="outlined"

                />
                <FormControl variant="outlined" className={classes.selectInput}>
                  Duration
                  <div className={classes.textField}
                  >
                    <DurationPicker
                      onValueChange={(v) => {
                        setValues({
                          ...values,
                          duration: v / 60
                        })
                      }}
                      value={values.duration * 60}
                      views={['days', 'hours', 'minutes']}
                      formatDuration={formatDuration}
                    />
                  </div>
                </FormControl>
                <FormControl style={{ marginTop: 16 }} className={classes.textField}>
                  <button
                    id="upload_widget"
                    className="cloudinary-button"
                    onClick={cloudniaryBtnCallback}
                  >
                    Upload image
                  </button>
                </FormControl>
                <TextField
                  id="image"
                  label="Image"
                  className={classes.textField}
                  value={values.image}
                  onChange={handleChange('image')}
                  margin="normal"
                  variant="outlined"
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
                  variant="outlined"
                />

                <FormControlLabel
                  id="enablePush"
                  style={{ margin: 0 }}
                  control={
                    <Checkbox color="primary" checked={values.enablePush} onChange={handleCheckboxChange('enablePush')} />
                  }
                  label="Send Push Reminder"
                />

                <TextField
                  id="zoomUrl"
                  label="Zoom Meeting URL"
                  multiline
                  fullWidth
                  className={classes.textField}
                  value={values.zoomUrl}
                  onChange={handleChange('zoomUrl')}
                  margin="normal"
                  variant="outlined"
                />

                <FormControlLabel
                  id="isLive"
                  style={{ margin: 0 }}
                  control={
                    <Checkbox color="primary" checked={values.isLive} onChange={handleCheckboxChange('isLive')} />
                  }
                  label="Live Workout"
                />

              </form>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={props.handleClose}
                color="primary"
              >
                Cancel
              </Button>
              <SnackbarContext.Consumer>
                {(value) => (
                  <Button
                    onClick={() => {
                      if (variables.title === ''
                        || variables.instructor === ''
                        || variables.style === ''
                        || variables.date === ''
                        || variables.location === ''
                        || variables.totalSpotsString === ''
                        || variables.description === ''
                        || variables.image === '') {
                        value.openSnackbar('error', 'Please make sure there are no empty fields')
                        return;
                      }
                      client.mutate({
                        mutation,
                        variables,
                      })
                        .then(async ({ data, error }) => {
                          props.action === 'edit'
                            && props.handleClose();
                          props.action === 'create'
                            && client.mutate({
                              mutation: updateCompanyMutation,
                              variables: {
                                _id: currentCompany._id,
                                eventsIds: data.createEvent._id,
                              },
                            })
                              .then(({ data, error }) => {
                                console.log('updated company with event');
                                props.handleClose();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                    color="primary"
                  >
                    OK
                  </Button>
                )}
              </SnackbarContext.Consumer>

            </DialogActions>
          </div>
        );
      }}
    </CurrentCompanyContext.Consumer >

  );
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
  },
};
