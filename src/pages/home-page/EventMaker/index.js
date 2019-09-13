import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Paper, CardMedia} from '@material-ui/core';
import EventMakerCard from './EventMakerCard';
import EventMakerDialog from './EventMakerDialog'
import logo from '../../../Assets/logo.png'
import eventMakersQuery from '../../../graphql/event-maker/query/event-maker'
import moment from 'moment'
import {useApolloClient} from "@apollo/react-hooks";

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

const EventMaker = ({classes}) => {

    const client = useApolloClient()

    const [eventMakers, setEventMakers] = React.useState([])

    const getEventMakers = () => {
        client.watchQuery({
            query: eventMakersQuery
        })
            .subscribe(({data}) => {
                const {eventMakers} = data
                setEventMakers(eventMakers)
            }, (error) => {
                console.log(error)
            })

    }

    React.useEffect(() => {
        getEventMakers()
    }, [])

    return (
        <div className={classes.grid}>
            <div className={classes.header}>
                <EventMakerDialog action="create"/>

                <Typography gutterBottom variant={"h4"}>
                    Recurring Events Maker
                </Typography>
            </div>
            <Grid container spacing={2} style={{marginBottom: 24, marginTop: 8}}>

                {eventMakers.length < 1 ?
                    <Paper className={classes.empty}>
                        <div style={{textAlign: 'center '}}>
                            <CardMedia style={{width: 200, height: 200, margin: 'auto'}} image={logo}/>
                            <Typography variant={"h4"} className={classes.emptyText}>
                                There are no recurring events
                            </Typography>
                        </div>
                    </Paper> :
                    eventMakers.map((event, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                            <EventMakerCard
                                event={event}
                                title={event.title}
                                instructor={event.instructor}
                                location={event.location}
                                date={event.date}
                                totalSpots={event.totalSpots}
                                takenSpots={event.users.length}
                                description={event.description}
                                image={event.image}
                                company={event.company}
                                id={event._id}
                            />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );

}

export default withStyles(styles)(EventMaker);
