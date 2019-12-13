import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Paper, CardMedia} from '@material-ui/core';
import EventCard from './EventCard';
import CreateDialog from '../../../components/common/CreateDialog';
import logo from '../../../Assets/logo.png'
import moment from 'moment'
import CurrentCompanyContext from "../../../containers/CurrentCompany/CurrentCompanyContext";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    empty: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: "8px 8px",
        height: 400,
        flex: 1,

    },
    emptyText: {
        fontWeight: 400,
        color: '#75D6B2',
        marginTop: 16
    },
    header: {
        display: "flex",
        textAlign: "center",
        width: "100%",
        marginBottom: 32,
        justifyContent: "center",
        position: "relative"
    },

});

const EventsCompleted = ({disableCreateEvent, classes, events}) => {

    const {currentCompany} = React.useContext(CurrentCompanyContext)

    let pastEvents = events.filter(event => moment(event.date).isBefore(moment().startOf("day")))
    let sortedEvents = [
        {
            startOfWeek: moment().startOf('week'),
            endOfWeek: moment().endOf('week'),
            events: []
        }]
    pastEvents.map((event) => {
        // check if event belongs to existing week
        //If so, add event to week
        let i
        let addedToWeek = false
        for (i = 0; i < sortedEvents.length; i++) {
            const {startOfWeek, endOfWeek} = sortedEvents[i]
            if (moment(event.date).isBetween(startOfWeek, endOfWeek)) {
                sortedEvents[i].events.push(event)
                addedToWeek = true
            } else {

            }
        }
        //if event was not added to any week, create new week and add current event to it
        if (addedToWeek === true) {
            return null
        } else {
            let startOfWeek = moment(event.date).startOf('week')
            let endOfWeek = moment(event.date).endOf('week')
            let newWeek = {startOfWeek, endOfWeek, events: [event]}
            sortedEvents.push(newWeek)
        }

    });

    sortedEvents = sortedEvents.sort(function (weekA, weekB) {
        return moment(weekA.startOfWeek).isBefore(weekB.startOfWeek) ? 1 : -1
    });

    //sort the events by date within week
    let sortedByDate = sortedEvents.map((weeklyEventsArray) => {
        let sortedEvents = weeklyEventsArray.events.sort(function (a, b) {
            return moment(a.date).isAfter(b.date) ? -1 : moment(a.date).isAfter(b.date) ? 1 : 0
        });
        return {...weeklyEventsArray, events: sortedEvents}
    })

    console.log(JSON.stringify(sortedEvents))

    return (
        <div className={classes.grid}>
            {!disableCreateEvent && <div className={classes.header}>
                <CreateDialog type="event" action={"create"}/>
                <Typography gutterBottom variant={"h4"}>
                    {`${!!currentCompany && currentCompany.name} Events`}
                </Typography>
            </div>}
            {sortedByDate[0].events.length > 0 && <Typography gutterBottom variant={"h5"}
                                                              style={{
                                                                  paddingLeft: 8,
                                                                  borderBottom: '1px solid black',
                                                                  borderColor: '#00f2c3'
                                                              }}>
                This Week
            </Typography>
            }
            <Grid container spacing={2} style={{marginBottom: 0, marginTop: 0}}>
                {pastEvents.length < 1 && !disableCreateEvent &&
                <Paper className={classes.empty}>
                    <div style={{textAlign: 'center '}}>
                        <CardMedia style={{width: 200, height: 200, margin: 'auto'}} image={logo}/>
                        <Typography variant={"h4"} className={classes.emptyText}>
                            There are no events for this company
                        </Typography>
                    </div>
                </Paper>}
                {pastEvents.length < 1 && disableCreateEvent ?
                    <Paper className={classes.empty}>
                        <div style={{textAlign: 'center '}}>
                            <CardMedia style={{width: 200, height: 200, margin: 'auto'}} image={logo}/>
                            <Typography variant={"h4"} className={classes.emptyText}>
                                No events are assigned to you at this time
                            </Typography>
                        </div>
                    </Paper> :
                    sortedByDate[0].events.map((event, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                            <EventCard
                                event={event}
                                title={event.title}
                                instructor={event.instructor}
                                location={event.location}
                                date={event.date}
                                totalSpots={event.totalSpots}
                                takenSpots={event.users.length}
                                description={event.description}
                                image={event.image}
                                id={event.id}
                            />
                        </Grid>
                    ))}
            </Grid>
            {sortedByDate.slice(1).map((week, index) => (
                <div style={{marginBottom: 24}}>
                    <Typography gutterBottom variant={"h5"}
                                style={{
                                    paddingLeft: 8,
                                    borderBottom: '1px solid black',
                                    borderColor: '#00f2c3'
                                }}>
                        {moment().diff(week.endOfWeek, 'weeks') === -1 ? 'Last Week' : `${moment().diff(week.startOfWeek, 'weeks')} Weeks ago`}
                    </Typography>
                    <Grid container spacing={2} style={{
                        marginTop: 8,
                    }}>
                        {week.events.map((event, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                                <EventCard
                                    event={event}
                                    title={event.title}
                                    instructor={event.instructor}
                                    location={event.location}
                                    date={event.date}
                                    totalSpots={event.totalSpots}
                                    takenSpots={event.users.length}
                                    description={event.description}
                                    image={event.image}
                                    id={event.id}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ))}


        </div>
    );

}

export default withStyles(styles)(EventsCompleted);
