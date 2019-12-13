import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {CardHeader, Divider} from '@material-ui/core';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import ActionMenu from "../../../components/common/ActionMenu";
import EventModal from "./EventModal"
import CurrentUserContext from "../../../containers/CurrentUser/CurrentUserContext";
import logo from '../../../Assets/logo-white.png'

const R = require("ramda");

moment.tz.setDefault("Asia/Jerusalem");


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
        position: 'relative'
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
    coinTag: {
        backgroundColor: "#85d7a9",
        paddingRight: 10,
        paddingLeft: 10,
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 100,
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

    let userContext = React.useContext(CurrentUserContext)
    console.log(event)

    const coins = R.pathOr('0', ['coins'])(event)

    return (
        <Card className={classes.card}>
            <EventModal event={event}>
                <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={title}
                    src=""
                >
                    <div className={classes.coinTag}>{coins} Coins Reward</div>
                </CardMedia>

            </EventModal>

            <CardHeader
                action={userContext.currentUser.roles.includes('admin') ? <ActionMenu card={event}/> : null}
                title={title}
                titleTypographyProps={{style: {textTransform: 'capitalize'}}}
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
                {/*<img style={{height: 20, width: 20}} src={require('../../../Assets/shalibo-app-icon.png')} />*/}
                <div style={{textAlign: "center", width: "100%"}}>
                    <Typography color={'primary'} variant={'caption'}>
                        {location} | {R.pathOr("Unknown", ["firstName"])(instructor)} {R.pathOr("", ["lastName"])(instructor)}
                    </Typography>
                </div>
                {/*<img style={{height: 20, width: 20}} src={require('../../../Assets/shalibo-app-icon.png')} />*/}
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
