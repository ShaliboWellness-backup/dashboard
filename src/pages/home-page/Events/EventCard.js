import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {CardHeader, Divider} from '@material-ui/core';
import moment from 'moment';
import ActionMenu from "../../../components/common/ActionMenu";
import EventModal from "./EventModal"

const R = require("ramda");


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',


    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        alignItems: "flex-start",
        paddingTop: 0,
    },
    timeCaption: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

function EventCard(props) {
    const {
        event, title, instructor, date, location, totalSpots, takenSpots, description, image, id
    } = props;
    const productDetails = {
        title, instructor, date, location, totalSpots, takenSpots, description, image,
    };
    const {classes} = props;
    const time = moment(date).format('llll');
    console.log(productDetails)
    return (
        <Card className={classes.card}>
            <EventModal event={event}>
                <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={title}
                    src=""
                />

            </EventModal>
            <CardHeader
                action={<ActionMenu card={event}/>}
                title={title}
                subheader={moment(date).format(" MMMM Do, HH:mm")}

            />


            <CardContent className={classes.cardContent}>
                <div className={classes.timeCaption}>
                    <Typography gutterBottom variant="body1"
                                color="textSecondary">{moment(date).fromNow()}</Typography>
                    <Typography variant="body1" color="textSecondary">
                        {`${takenSpots}/${totalSpots} spots `}
                    </Typography>

                </div>
                <Typography>{description}</Typography>
            </CardContent>
            <Divider variant="fullWidth"/>
            <CardActions>
                <div style={{textAlign: "center", width: "100%"}}>
                    <Typography color={'primary'} variant={'caption'}>
                        {location} | {R.pathOr("Unknown", ["name"])(instructor)}
                    </Typography>
                </div>
            </CardActions>
        </Card>
    );
}

EventCard.defaultProps = {
    saved: false,
};

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventCard);
