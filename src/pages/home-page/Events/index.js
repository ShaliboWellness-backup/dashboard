import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Paper, CardMedia} from '@material-ui/core';
import EventCard from './EventCard';
import CreateDialog from '../../../components/common/CreateDialog';
import logo from '../../../Assets/logo.png'
import moment from 'moment'

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
        height: 450,
        flex: 1,

    },
    emptyText: {
        fontWeight: 400,
        color: '#75D6B2',
        marginTop: 16
    }

});

const Events = ({disableCreateEvent, classes, events}) => {
    let futureEvents = events.filter(event => moment(event.date).isAfter(moment()))
    let sortedEvents = [
        {
            startOfWeek: moment().startOf('week'),
            endOfWeek: moment().endOf('week'),
            events: []
        }]
    futureEvents.map((event) => {
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

    })

    console.log(sortedEvents)

    return (
        <div className={classes.grid}>
            {sortedEvents[0].events.length > 0 && <Typography gutterBottom variant={"h5"}
                                                              style={{
                                                                  paddingLeft: 8,
                                                                  borderBottom: '1px solid black',
                                                                  borderColor: '#00f2c3'
                                                              }}>
                This Week
            </Typography>}
            <Grid container spacing={2} style={{marginBottom: 24, marginTop: 8}}>
                {disableCreateEvent ? null : (
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <CreateDialog type="event" action="create"/>
                    </Grid>
                )
                }
                {futureEvents.length < 1 && disableCreateEvent ?
                    <Paper className={classes.empty}>
                        <div style={{textAlign: 'center '}}>
                            <CardMedia style={{width: 200, height: 200, margin: 'auto'}} image={logo}/>
                            <Typography variant={"h4"} className={classes.emptyText}>
                                No events are assigned to you at this time
                            </Typography>
                        </div>
                    </Paper> :
                    sortedEvents[0].events.map((event, index) => (
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
            {sortedEvents.slice(1).map((week, index) => (
                <div style={{marginBottom: 24}}>
                    <Typography gutterBottom variant={"h5"}
                                style={{
                                    paddingLeft: 8,
                                    borderBottom: '1px solid black',
                                    borderColor: '#00f2c3'
                                }}>
                        {moment().diff(week.startOfWeek, 'weeks') === 0 ? 'Next Week' : `${-moment().diff(week.startOfWeek, 'weeks') + 1} Weeks From Now`}
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
