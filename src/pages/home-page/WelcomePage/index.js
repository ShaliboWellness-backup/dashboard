import React from 'react';
import {Grid, Typography, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import Events from '../Events';
import yoga from '../../../fakeData/Images/yoga.jpg';
import yoga_tn from '../../../fakeData/Images/yoga_tn.jpg';
import pilates from '../../../fakeData/Images/pilates.jpg';
import pilates_tn from '../../../fakeData/Images/pilates_tn.jpg';
import strength from '../../../fakeData/Images/strength.jpg';
import strength_tn from '../../../fakeData/Images/strength_tn.jpg';
import wellness from '../../../fakeData/Images/wellness.jpg';
import wellness_tn from '../../../fakeData/Images/wellness_tn.jpg';
import {Query} from "react-apollo";
import getEventsQuery from "../../../graphql/event/query/event";

const styles = theme => ({
    welcome: {
        textAlign: 'center',
        marginBottom: 15,
        padding: 15,
        position: "relative",
        overflow: "hidden"
    },
    statContainer: {
        height: '100%',
    },
    stats: {
        textAlign: 'center',
        padding: 32,

    },
    number: {
        fontWeight: 'bold',
    },
    outerCircle: {
        background: 'linear-gradient(0deg, #0098f0 0%, #00f2c3 100%)',
        borderRadius: '50%',
        width: 150,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    },
    innerCircle: {
        background: '#eee',
        borderRadius: '50%',
        width: 130,
        height: 130,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// const upcomingEvents = [{
//     title: 'YOGA',
//     instructor: 'Daniel David Shalibo',
//     location: {building: 'Adidas Head Office', room: '3rd floor, room 301'},
//     time: '07:00',
//     date: '2019-07-29T07:00:00.000Z',
//     totalSpots: 20,
//     takenSpots: 17,
//     description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
//     image: yoga,
//     thumbnail: yoga_tn,
//     id: '1',
// },
//     {
//         title: 'PILATES',
//         instructor: 'Shiran Harel',
//         location: {building: 'Adidas Head Office', room: 'Rooftop'},
//         time: '19:00',
//         date: '2019-07-29T19:00:00.000Z',
//         totalSpots: 20,
//         takenSpots: 10,
//         description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
//         image: pilates,
//         thumbnail: pilates_tn,
//         id: '2',
//     },
//     {
//         title: 'STRENGTH',
//         instructor: 'Daniel David Shalibo',
//         location: {building: 'Adidas Head Office', room: '3rd floor, room 301'},
//         time: '15:00',
//         date: '2019-07-30T15:00:00.000Z',
//         totalSpots: 40,
//         takenSpots: 27,
//         description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
//         image: strength,
//         thumbnail: strength_tn,
//         id: '3',
//     },
//     {
//         title: 'WELLNESS',
//         instructor: 'Shiran Harel',
//         location: {building: 'Adidas Head Office', room: '6th floor, room 605'},
//         time: '17:00',
//         date: '2019-07-31T17:00:00.000Z',
//         totalSpots: 20,
//         takenSpots: 18,
//         description: 'Some short description about the workout, who is it intended for, what level is it going to be, etc.',
//         image: wellness,
//         thumbnail: wellness_tn,
//         id: '4',
//     }];

const WelcomePage = ({classes, company}) => (
    <React.Fragment>
        <Paper className={classes.welcome}>
            <div style={{
                background: "linear-gradient(90deg,rgba(225,78,202,.6) 0,rgba(225,78,202,0))",
                position: "absolute", width: 250, height: 100, marginTop: -40, marginLeft: -100,
                transform: "rotate(30deg)",
            }}/>
            <div style={{
                background: "linear-gradient(90deg,rgba(225,78,202,.6) 0,rgba(225,78,202,0))",
                position: "absolute", width: 250, height: 100, marginTop: -90, marginLeft: -50,
                transform: "rotate(150deg)",
            }}/>
            <div style={{
                background: "linear-gradient(90deg,rgba(225,78,202,.6) 0,rgba(225,78,202,0))",
                position: "absolute", width: 250, height: 100, marginTop: -70, marginLeft: 0,
                transform: "rotate(160deg)",
            }}/>
            <div style={{
                background: "linear-gradient(90deg,rgba(225,78,202,.6) 0,rgba(225,78,202,0))",
                position: "absolute", width: 250, height: 100, marginTop: -70, marginLeft: 0,
                right: -140, bottom: -30,
                transform: "rotate(160deg)",
            }}/>
            <div style={{
                background: "linear-gradient(90deg,rgba(225,78,202,.6) 0,rgba(225,78,202,0))",
                position: "absolute", width: 250, height: 100, marginTop: -25, marginLeft: 0,
                right: -55, bottom: -45,
                transform: "rotate(200deg)",
            }}/>
            <div style={{
                background: "linear-gradient(90deg,rgba(225,78,202,.6) 0,rgba(225,78,202,0))",
                position: "absolute", width: 250, height: 100, marginTop: -40, marginLeft: -100,
                transform: "rotate(150deg)", right: -70, top: 40
            }}/>
            <Typography variant="h4">
                Hey Daniel,
            </Typography>
            <Typography gutterBottom color="textSecondary" variant="h5">
                Here Are Your Upcoming Events
            </Typography>
        </Paper>
        <Query query={getEventsQuery}>
            {({loading, error, data}) => {
                const {events} = data
                if (loading) {
                    return <p>loading...</p>
                }
                if (error) {
                    return console.log(error)
                } else {
                    console.log(data)
                    return (
                        <Events disableCreateEvent events={events}/>
                    )
                }


            }
            }
        </Query>


    </React.Fragment>
);

export default withStyles(styles)(WelcomePage);
