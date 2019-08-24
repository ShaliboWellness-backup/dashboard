import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import {CardHeader} from "@material-ui/core";
import AttendingUsers from "./AttendingUsers";

const R = require("ramda");


const styles = (theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        position: "relative"
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',


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
    count: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        color: "white"
    }
})

function EventModal(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const {event, classes} = props

    console.log(event.users)
    return (
        <div>
            <div style={{cursor: "pointer"}} onClick={handleClickOpen}>
                {props.children}
            </div>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                scroll={"body"}
            >
                <CardMedia
                    className={classes.cardMedia}
                    image={event.image}
                    title={event.title}
                    src=""
                >

                    <Typography className={classes.count} variant="h6">
                        {`${event.users.length}/${event.totalSpots} spots `}
                    </Typography>

                </CardMedia>
                <CardHeader
                    title={`${event.title} with ${R.pathOr("Unknown", ["name"])(event.instructor)}`}
                    subheader={`${moment(event.date).format(" MMMM Do, HH:mm")} at ${event.location}`}
                    // subheaderTypographyProps={{style: {color: 'white'}}}
                    // titleTypographyProps={{style: {color: 'white'}}}
                />

                <DialogContent className={classes.cardContent}>
                    <Typography>{event.description}</Typography>
                    <AttendingUsers users={event.users}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(EventModal)
