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

const Events = ({showLatestPastEvents, disableCreateEvent, classes, events}) => {

    const {currentCompany} = React.useContext(CurrentCompanyContext)

    let futureEvents;

    if (showLatestPastEvents) {
        futureEvents = events.filter(event => moment(event.date).isAfter(moment().subtract(7,'d').startOf("day")))
    } else {
        futureEvents = events.filter(event => moment(event.date).isAfter(moment().startOf("day")))
    }

    let sortedEvents = []

    futureEvents.forEach((event) => {
        let weekFoundForEvent = false
        sortedEvents.forEach((week) => {

            //Add event to week if the week exist
            if (moment(event.date).isBetween(week.startOfWeek, week.endOfWeek)) {
                week.events.push(event)
                weekFoundForEvent = true
            }
        })

        //Create new week if the week does not exist
        if(!weekFoundForEvent) {
            let newWeek = {
                startOfWeek: moment(event.date).startOf('week'),
                endOfWeek: moment(event.date).endOf('week'),
                events: []
            }
            newWeek.events.push(event)
            sortedEvents.push(newWeek)
        }
    })

    //sort the events by date within week
    let sortedByDate = sortedEvents.map((weeklyEventsArray) => {
        let sortedEvents = weeklyEventsArray.events.sort(function (a, b) {
            return moment(b.date).isAfter(a.date) ? -1 : moment(a.date).isAfter(b.date) ? 1 : 0
        });
        return {...weeklyEventsArray, events: sortedEvents}
    })

    sortedByDate = sortedByDate.sort((a, b) => {
        return a.startOfWeek.isBefore(b.startOfWeek) ? -1 : 1
    })

    const getTextForWeekHeader = (startOfWeek) => {
        let diff = moment().startOf('week').diff(startOfWeek, 'weeks')
        if (diff === 0) { return 'This Week' }
        if (diff === -1) { return 'Next Week' }
        if (diff < 0) { return `${-diff} Weeks From Now` }
        if (diff > 0) { return `${diff} Weeks Ago` }
    }

    return (
        <div className={classes.grid}>
            {!disableCreateEvent && <div className={classes.header}>
                <CreateDialog type="event" action={"create"}/>
                <Typography gutterBottom variant={"h4"}>
                    {`${!!currentCompany && currentCompany.name} Events`}
                </Typography>
            </div>}

            <Grid container spacing={2} style={{marginBottom: 24, marginTop: 8}}>
                {futureEvents.length < 1 && !disableCreateEvent &&
                <Paper className={classes.empty}>
                    <div style={{textAlign: 'center '}}>
                        <CardMedia style={{width: 200, height: 200, margin: 'auto'}} image={logo}/>
                        <Typography variant={"h4"} className={classes.emptyText}>
                            There are no events for this company
                        </Typography>
                    </div>
                </Paper>}
                {futureEvents.length < 1 && disableCreateEvent ?
                    <Paper className={classes.empty}>
                        <div style={{textAlign: 'center '}}>
                            <CardMedia style={{width: 200, height: 200, margin: 'auto'}} image={logo}/>
                            <Typography variant={"h4"} className={classes.emptyText}>
                                No events are assigned to you at this time
                            </Typography>
                        </div>
                    </Paper> : <div />
                    }
            </Grid>
            {sortedByDate.slice(0).map((week, index) => (
                <div style={{marginBottom: 24}}>
                    <Typography gutterBottom variant={"h5"}
                                style={{
                                    paddingLeft: 8,
                                    borderBottom: '1px solid black',
                                    borderColor: '#00f2c3'
                                }}>
                        {getTextForWeekHeader(week.startOfWeek)}
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

export default withStyles(styles)(Events);
