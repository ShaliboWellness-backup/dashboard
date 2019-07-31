import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core"
import EventCard from "./EventCard"

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
})

const Events = ({classes, events}) => {


    return (
        <div className={classes.grid}>
            <Grid container spacing={2}>
                {events.map((event , index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                        <EventCard
                            event={event}
                            title={event.title}
                            instructor={event.instructor}
                            location={event.location}
                            time={event.time}
                            date={event.date}
                            totalSpots={event.totalSpots}
                            takenSpots={event.takenSpots}
                            description={event.description}
                            image={event.image}
                            thumbnail={event.thumbnail}
                            id={event.id}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Events)
