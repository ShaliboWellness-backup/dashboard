import React from 'react';
import { withStyles } from '@material-ui/styles';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useApolloClient } from '@apollo/react-hooks';
import MomentUtils from '@date-io/moment';
import Add from '@material-ui/icons/Add';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CurrentCompanyContext from '../../../containers/CurrentCompany/CurrentCompanyContext';
import updateCompanyMutation from '../../../graphql/companies/mutation/update-company';
import trainersQuery from '../../../graphql/user/query/trainers';
import SnackbarContext from '../../../containers/CustomSnackbar/SnackbarContext';
import createEventMakerMutation from '../../../graphql/event-maker/mutation/create-event-maker';
import updateEventMakerMutation from '../../../graphql/event-maker/mutation/update-event-maker';
import getCompaniesQuery from '../../../graphql/companies/query/companies';
import eventMakersQuery from '../../../graphql/event-maker/query/event-maker';

const R = require('ramda');

moment.tz.setDefault('Asia/Jerusalem');


const DEFAULT = {
  title: '',
  instructor: '',
  location: '',
  totalSpots: 10,
  description: '',
  image: '',
  date: new Date(),
  enablePush: true,
};


const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',

  },
  textField: {

    width: '100%',
  },
  selectInput: {

    marginTop: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  test: {
    border: '1px solid #e0e0e0',
  },
  dayAvatar: {
    height: 25,
    width: 25,
    fontSize: '1rem',
  },
  repeatContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },

});

const EventMaker = (props) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const client = useApolloClient();

  const { currentCompany } = React.useContext(CurrentCompanyContext);

  const { event, classes } = props;

  const inputLabel = React.useRef(null);

  const [open, setOpen] = React.useState(false);

  const [labelWidth, setLabelWidth] = React.useState(0);

  const [days, setDays] = React.useState([]);

  const [companies, setCompanies] = React.useState([]);


  const [values, setValues] = React.useState({
    title: event.title ? event.title : '',
    style: event.style ? event.style : '',
    instructor: event.instructor ? event.instructor._id : '',
    location: event.location ? event.location : '',
    totalSpotsString: event.totalSpots ? event.totalSpots : '',
    description: event.description ? event.description : '',
    image: event.image ? event.image : '',
    date: event.date ? event.date : new Date(),
    dateEnd: event.dateEnd ? event.dateEnd : moment(event.date || new Date()).add(1, 'hours').toDate(),
    coinsString: event.coins ? event.coins : '15',
    company: '',
    trainers: [],
    enablePush: props.action === 'create' ? true : event.enablePush,
    isLive: event.isLive ? event.isLive : false,
    zoomUrl: event.zoomUrl ? event.zoomUrl : null,
  });


  React.useEffect(() => {
    setLabelWidth(!!inputLabel.current && inputLabel.current.offsetWidth);
    getTrainers();
    // getCompanies()
    !!currentCompany && setValues({ ...values, company: currentCompany._id });
    !!event.cron && setDays(event.cron.split(' ')[4].split(',').map(item => parseInt(item)));
  }, [event, currentCompany]);


  const cloundinaryWidgetRef = React.useRef(undefined);

  const cloudniaryBtnCallback = (e) => {
    e.preventDefault();
    if (!cloundinaryWidgetRef.current) return;
    cloundinaryWidgetRef.current.open();
  }

  React.useEffect(() => {
    if (!window.cloudinary || !open || cloundinaryWidgetRef.current) return;

    cloundinaryWidgetRef.current = window.cloudinary.createUploadWidget({
      cloudName: 'djxrfd5tp',
      uploadPreset: 'hsnb1qsi',
      multiple: false,
    }, (error, result) => {
      if (error || !result || result.event !== 'success') return;
      console.log('Done! Here is the image info: ', result.info);
      setValues({
        ...values,
        image: result.info.secure_url
      })
    }
    );
  }, [window.cloudinary, open]);



  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handlePushChange = name => (event) => {
    setValues({ ...values, enablePush: event.target.checked });
  };

  const handleCompanyChange = name => (event) => {
    const newCompany = { _id: event.target.value };
    setValues({ ...values, company: newCompany });
  };

  const handleSetDate = (date) => {
    setValues({ ...values, date });
  };

  const handleSetDateEnd = (date) => {
    setValues({ ...values, dateEnd: date });
  };

  const handleCheckboxChange = name => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleSetDays = (value) => {
    if (days.includes(value)) {
      const newDays = days.filter(day => day !== value);
      setDays(newDays.sort());
    } else {
      const newDays = days;
      newDays.push(value);
      setDays(newDays.sort());
    }
  };


  const getTrainers = () => {
    client.query({
      query: trainersQuery,
    })
      .then(({ data }) => {
        const trainers = data.trainers.filter(user => user.roles.includes('trainer'));
        setValues({ ...values, trainers });

        return null;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getCompanies = () => {
  //     client.query({
  //         query: getCompaniesQuery
  //     })
  //         .then(({data}) => {
  //             const {companies} = data
  //             setCompanies(companies)
  //             return null
  //         })
  //         .catch((error) => {
  //             console.log(error)
  //         })
  // }

  const availableStyles = ['pilates', 'strength', 'wellness', 'yoga'];

  const {
    title, style, instructor, location, totalSpotsString, coinsString, description, image, date, dateEnd, company, enablePush, isLive, zoomUrl,
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
    dateEnd: typeof dateEnd === 'object' ? dateEnd.toISOString() : dateEnd,
    company: !!currentCompany && currentCompany._id,
    enablePush,
    isLive,
    zoomUrl,
  };


  const variables = props.action === 'create' ? { ...formData } : { ...formData, _id: event._id };

  const mutation = props.action === 'create' ? createEventMakerMutation : updateEventMakerMutation;

  let array = [];
  array = !!event.cron && event.cron.split(' ');
  const separated = array ? array[array.length - 1].split(',') : [];
  const test = !!event.cron && event.cron.split(' ')[4].split(',').includes('3');

  console.log({ variables, formData, mutation });

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      {props.action === 'create' ? (
        <Fab
          style={{
            position: 'absolute',
            left: 0,
          }}
          variant="extended"
          color="primary"
          onClick={() => handleOpen()}
        >
          <Add /> New Recurring Event
        </Fab>
      )
        : (
          <MenuItem onClick={handleOpen}>
            <Typography variant="body1" color="textSecondary">
              Edit
            </Typography>
          </MenuItem>
        )}
      <Dialog maxWidth="sm" scroll="body" fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle
          id="form-dialog-title"
        > {props.action === 'create' ? 'Create ' : 'Edit '}
                    Recurring Event
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can change the details of a specific recurring event.
            Please note that changes will be visible to all relevant users once submitted.
          </DialogContentText>
          <form className={classes.container} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={6} xs={6}>
                <TextField
                  id="title"
                  label="Title"
                  className={classes.textField}
                  value={values.title}
                  onChange={handleChange('title')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={6}>
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
                    {values.trainers.length > 0 ? values.trainers.map(trainer => (
                      <MenuItem
                        key={trainer._id}
                        value={trainer._id}
                      >{trainer.firstName} {trainer.lastName}
                      </MenuItem>
                    ))
                      : <MenuItem key={1} value="">No Available Trainers</MenuItem>
                    }

                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6} xs={6}>
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
                    {availableStyles.length > 0 ? availableStyles.map(style => (
                      <MenuItem
                        key={style}
                        value={style}
                      >{style}
                      </MenuItem>
                    ))
                      : <MenuItem key={1} value="">No Available Styles</MenuItem>
                    }

                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item xs={6}> */}
              {/*    <FormControl variant="outlined" className={classes.selectInput}> */}
              {/*        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple"> */}
              {/*            Company */}
              {/*        </InputLabel> */}
              {/*        <Select */}
              {/*            MenuProps={{classes: {list: classes.test}}} */}
              {/*            value={values.company._id} */}
              {/*            onChange={handleCompanyChange('company')} */}
              {/*            input={<OutlinedInput labelWidth={60} name="company" */}
              {/*                                  id="outlined-age-simple"/>} */}
              {/*        > */}
              {/*            {companies.length > 0 ? companies.map((company) => ( */}
              {/*                    <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem> */}
              {/*                )) : */}
              {/*                <MenuItem key={1} value={""}>No Available Companies</MenuItem> */}
              {/*            } */}

              {/*        </Select> */}
              {/*    </FormControl> */}
              {/* </Grid> */}
              <Grid item md={6} xs={6}>
                <TextField
                  id="location"
                  label="Location"
                  className={classes.textField}
                  value={values.location}
                  onChange={handleChange('location')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={6}>
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
              </Grid>
              <Grid item md={6} xs={6}>
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
              </Grid>
              <Grid item md={6} xs={6}>
                <DateTimePicker
                  autoOk
                  ampm={false}
                  value={values.date}
                  onChange={date => handleSetDate(date)}
                  label="Date & Time"
                  className={classes.textField}
                  style={{ marginTop: 16 }}
                  inputVariant="outlined"

                />
              </Grid>
              <Grid item md={6} xs={6}>
                <DateTimePicker
                  autoOk
                  ampm={false}
                  value={values.dateEnd}
                  onChange={date => handleSetDateEnd(date)}
                  label="End Date & Time"
                  className={classes.textField}
                  style={{ marginTop: 16 }}
                  inputVariant="outlined"

                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  id="image"
                  label="Image"
                  className={classes.textField}
                  value={values.image}
                  onChange={handleChange('image')}
                  margin="normal"
                  variant="outlined"
                />

              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  className={classes.textField}
                  value={values.description}
                  onChange={handleChange('description')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} className={classes.imageButton}>
                <button
                  id="upload_widget"
                  class="cloudinary-button"
                  onClick={cloudniaryBtnCallback}>
                  Upload image
                </button>
              </Grid>

              <Grid item md={6} xs={6}>
                <FormControlLabel
                  style={{ width: '100%', height: '100%', margin: 0 }}
                  control={
                    <Checkbox color="primary" checked={values.enablePush} onChange={handlePushChange('enablePush')} />
                  }
                  label="Send Push Reminder"
                />
              </Grid>
              <Grid item md={6} xs={6}>
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
              </Grid>
              <Grid item md={6} xs={6}>
                <FormControlLabel
                  id="isLive"
                  style={{ width: '100%', height: '100%', margin: 0 }}
                  control={
                    <Checkbox color="primary" checked={values.isLive} onChange={handleCheckboxChange('isLive')} />
                  }
                  label="Live Workout"
                />
              </Grid>
              <Grid item xs={8}>
                <div>
                  <Typography gutterBottom>
                    Repeat On
                  </Typography>
                  <div className={classes.repeatContainer}>
                    <Checkbox
                      icon={<Avatar className={classes.dayAvatar}>S</Avatar>}
                      defaultChecked={!!event.cron && event.cron.split(' ')[4].split(',').includes('0')}
                      checkedIcon={(
                        <Avatar
                          className={classes.dayAvatar}
                          style={{ backgroundColor: theme.palette.primary.main }}
                        >
                          S
                        </Avatar>
                      )}
                      color="primary"
                      value={0}
                      onChange={() => handleSetDays(0)}
                    />

                    <Checkbox
                      icon={<Avatar className={classes.dayAvatar}>M</Avatar>}
                      defaultChecked={!!event.cron && event.cron.split(' ')[4].split(',').includes('1')}
                      checkedIcon={(
                        <Avatar
                          className={classes.dayAvatar}
                          style={{ backgroundColor: theme.palette.primary.main }}
                        >
                          M
                        </Avatar>
                      )}
                      color="primary"
                      onChange={() => handleSetDays(1)}
                    />

                    <Checkbox
                      icon={<Avatar className={classes.dayAvatar}>T</Avatar>}
                      defaultChecked={!!event.cron && event.cron.split(' ')[4].split(',').includes('2')}
                      checkedIcon={(
                        <Avatar
                          className={classes.dayAvatar}
                          style={{ backgroundColor: theme.palette.primary.main }}
                        >
                          T
                        </Avatar>
                      )}
                      color="primary"
                      onChange={() => handleSetDays(2)}
                    />
                    <Checkbox
                      icon={<Avatar className={classes.dayAvatar}>W</Avatar>}
                      defaultChecked={!!event.cron && event.cron.split(' ')[4].split(',').includes('3')}
                      checkedIcon={(
                        <Avatar
                          className={classes.dayAvatar}
                          style={{ backgroundColor: theme.palette.primary.main }}
                        >
                          W
                        </Avatar>
                      )}
                      color="primary"
                      onChange={() => handleSetDays(3)}
                    />
                    <Checkbox
                      icon={<Avatar className={classes.dayAvatar}>T</Avatar>}
                      defaultChecked={!!event.cron && event.cron.split(' ')[4].split(',').includes('4')}
                      checkedIcon={(
                        <Avatar
                          className={classes.dayAvatar}
                          style={{ backgroundColor: theme.palette.primary.main }}
                        >
                          T
                        </Avatar>
                      )}
                      color="primary"
                      onChange={() => handleSetDays(4)}
                    />
                    <Checkbox
                      icon={<Avatar className={classes.dayAvatar}>F</Avatar>}
                      defaultChecked={!!event.cron && event.cron.split(' ')[4].split(',').includes('5')}
                      checkedIcon={(
                        <Avatar
                          className={classes.dayAvatar}
                          style={{ backgroundColor: theme.palette.primary.main }}
                        >
                          F
                        </Avatar>
                      )}
                      color="primary"
                      onChange={() => handleSetDays(5)}
                    />
                    <Checkbox
                      icon={<Avatar className={classes.dayAvatar}>S</Avatar>}
                      defaultChecked={!!event.cron && event.cron.split(' ')[4].split(',').includes('6')}
                      checkedIcon={(
                        <Avatar
                          className={classes.dayAvatar}
                          style={{ backgroundColor: theme.palette.primary.main }}
                        >
                          S
                        </Avatar>
                      )}
                      color="primary"
                      onChange={() => handleSetDays(6)}
                    />

                  </div>
                </div>
              </Grid>
            </Grid>
          </form>

        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            color="primary"
          >
            Clear
          </Button>
          <SnackbarContext.Consumer>
            {(value) => {
              console.log({ values });
              return (
                <Button
                  onClick={() => {
                    const selectedDays = days.join(',');
                    const hours = moment(values.date).format('HH');
                    const minutes = moment(values.date).format('mm');
                    const cron = `${minutes} ${hours} * * ${selectedDays}`;
                    const temp = { ...variables, cron };

                    console.log('query', { variables })

                    return variables.title === ''
                      || variables.style === ''
                      || variables.instructor === ''
                      || variables.date === ''
                      || variables.location === ''
                      || variables.totalSpotsString === ''
                      || variables.description === ''
                      || variables.image === ''
                      || days === []
                      ? value.openSnackbar('error', 'Please make sure there are no empty fields')
                      : client.mutate({
                        mutation,
                        variables: { ...variables, cron },
                        refetchQueries: [{ query: eventMakersQuery }],
                      })
                        .then(({ data }) => {
                          console.log(data);
                          handleClose();
                        })
                        .catch((error) => {
                          console.log(error);
                          handleClose();
                        });
                  }}
                  color="primary"
                >
                  OK
                </Button>
              );
            }}
          </SnackbarContext.Consumer>

        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(EventMaker);

EventMaker.defaultProps = {
  action: 'create',
  event: {
    title: '',
    instructor: '',
    location: '',
    totalSpots: 10,
    description: '',
    image: '',
    date: new Date(),
    dateEnd: moment(new Date()).add(1, 'hours').toDate()
  },
};
