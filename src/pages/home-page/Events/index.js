import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import EventCard from './EventCard';
import CreateDialog from '../../../components/common/CreateDialog';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

const Events = ({disableCreateEvent, classes, events}) => (
    <div className={classes.grid}>
        <Grid container spacing={2}>
            {disableCreateEvent ? null : (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CreateDialog type="event" action="create"/>
                </Grid>
            )
            }
            {events.map((event, index) => (
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
);

export default withStyles(styles)(Events);
