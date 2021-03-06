import React from 'react';
import {
    CircularProgress, Paper, Typography, useMediaQuery,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Query } from '@apollo/client/react/components';
import Events from '../Events';
import getEventsQuery from '../../../graphql/event/query/event';
import getCompanyEventsQuery from '../../../graphql/companies/query/get-events';

const styles = (theme) => ({
    welcome: {
        textAlign: 'center',
        marginBottom: 15,
        padding: 15,
        position: 'relative',
        overflow: 'hidden',
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

const WelcomePage = ({ classes, company, user }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (!company || !company._id) {
        console.log({ company: company });
        return <CircularProgress />
    }

    return (
        <>
            <Paper className={classes.welcome}>
                <div style={{
                    background: 'linear-gradient(90deg,rgba(0,242,195,.6) 0,rgba(0,242,195,0))',
                    position: 'absolute',
                    width: isMobile ? 0 : 250,
                    height: 100,
                    marginTop: -40,
                    marginLeft: -100,
                    transform: 'rotate(30deg)',
                }}
                />
                <div style={{
                    background: 'linear-gradient(90deg,rgba(0,242,195,.6) 0,rgba(0,242,195,0))',
                    position: 'absolute',
                    width: isMobile ? 0 : 250,
                    height: 100,
                    marginTop: -90,
                    marginLeft: -50,
                    transform: 'rotate(150deg)',
                }}
                />
                <div style={{
                    background: 'linear-gradient(90deg,rgba(0,242,195,.6) 0,rgba(0,242,195,0))',
                    position: 'absolute',
                    width: isMobile ? 0 : 250,
                    height: 100,
                    marginTop: -70,
                    marginLeft: 0,
                    transform: 'rotate(160deg)',
                }}
                />
                <div style={{
                    background: 'linear-gradient(90deg,rgba(0,242,195,.6) 0,rgba(0,242,195,0))',
                    position: 'absolute',
                    width: isMobile ? 0 : 250,
                    height: 100,
                    marginTop: -70,
                    marginLeft: 0,
                    right: -140,
                    bottom: -30,
                    transform: 'rotate(160deg)',
                }}
                />
                <div style={{
                    background: 'linear-gradient(90deg,rgba(0,242,195,.6) 0,rgba(0,242,195,0))',
                    position: 'absolute',
                    width: isMobile ? 0 : 250,
                    height: 100,
                    marginTop: -25,
                    marginLeft: 0,
                    right: -55,
                    bottom: -45,
                    transform: 'rotate(200deg)',
                }}
                />
                <div style={{
                    background: 'linear-gradient(90deg,rgba(0,242,195,.6) 0,rgba(0,242,195,0))',
                    position: 'absolute',
                    width: isMobile ? 0 : 250,
                    height: 100,
                    marginTop: -40,
                    marginLeft: -100,
                    transform: 'rotate(150deg)',
                    right: -70,
                    top: 40,
                }}
                />
                <Typography variant="h4">
                    Hey {user ? user.firstName : ''},
                </Typography>
                <Typography gutterBottom color="textSecondary" variant="h5">
                    Here Are Your {company ? company.name : ''} Upcoming Events
                </Typography>
            </Paper>
            <Query
                query={getCompanyEventsQuery}
                variables={{ _id: company._id }}
                pollInterval={1000}>
                {({ loading, error, data }) => {
                    if (loading) {
                        console.log('loading');
                        return (
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <CircularProgress />
                            </div>
                        );
                    }
                    if (error) {
                        console.log(`error: ${error}`);
                        return <div>error</div>;
                    }

                    let events = [];
                    if (!loading && !!data) {
                        const allEvents = data.company ? (data.company.events || []) : [];
                        events = allEvents.filter((event) => event.instructor && event.instructor._id === user._id);
                        return <Events showLatestPastEvents disableCreateEvent events={events} />;
                    }
                }}

            </Query>

        </>
    );
};

export default withStyles(styles)(WelcomePage);
