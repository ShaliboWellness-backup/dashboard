import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Paper, CardMedia} from '@material-ui/core';
import EventCard from './EventCard';
import CreateDialog from '../../../components/common/CreateDialog';
import logo from '../../../Assets/logo.png'

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

const Events = ({disableCreateEvent, classes, events}) => (
    <div className={classes.grid}>
        <Grid container spacing={2}>
            {disableCreateEvent ? null : (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CreateDialog type="event" action="create"/>
                </Grid>
            )
            }
            {events.length === 0 && disableCreateEvent ?
                <Paper className={classes.empty}>
                    <div style={{textAlign: 'center '}}>
                        <CardMedia style={{width: 200, height: 200, margin: 'auto'}} image={logo}/>
                        <Typography variant={"h4"} className={classes.emptyText}>
                            No events are assigned to you at this time
                        </Typography>
                    </div>
                </Paper> :
                events.map((event, index) => (
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
