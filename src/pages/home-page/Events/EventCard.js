import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import { IconButton, CardHeader, Divider } from "@material-ui/core"
import Edit from "@material-ui/icons/Edit"
import Tooltip from "@material-ui/core/Tooltip"
import Zoom from "@material-ui/core/Zoom"
import {Link} from "react-router-dom"
import moment from "moment"
import CreateDialog from "../../../components/common/CreateDialog";


const styles = theme => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",

    },
    cardMedia: {
        paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
})

function EventCard(props) {
    const {event, title, instructor, date, location, totalSpots, takenSpots, description, image, thumbnail, id } = props
    const productDetails = { title, instructor, date, time, location, totalSpots, takenSpots, description, image, thumbnail, id }
    const { classes } = props
    const time = moment(date).format("llll")
    return (
                    <Card className={classes.card}>
                        <Link to={"#"}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={image}
                                title={title}
                                src="">
                            </CardMedia>

                        </Link>
                        <CardHeader
                            action={
                                    <Tooltip TransitionComponent={Zoom} title="עריכה">
                                        <CreateDialog type={"event"} event={event}/>
                                    </Tooltip>
                            }
                            title={title}
                            subheader={moment(date).fromNow()}
                        />



                        <CardContent className={classes.cardContent}>
                            <Typography variant={"caption"} color={"textSecondary"}>
                                {takenSpots +"/"+totalSpots+" spots"}
                            </Typography>
                            <Typography gutterBottom={true} variant={"caption"} color={"textSecondary"}>{time}</Typography>
                            <Typography>{description}</Typography>
                        </CardContent>
                        <Divider variant="fullWidth" />
                        <CardActions>
                            <div style={{minHeight: 50}}>
                      <Typography>
                          {location.building + ", " + location.room}
                      </Typography>
                            </div>
                        </CardActions>
                    </Card>
                )


}

EventCard.defaultProps = {
    saved: false,
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EventCard)
