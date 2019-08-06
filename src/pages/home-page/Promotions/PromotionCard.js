import React from "react"
import PropTypes from "prop-types"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {CardHeader, IconButton} from "@material-ui/core"
import Tooltip from "@material-ui/core/Tooltip"
import Zoom from "@material-ui/core/Zoom"
import CreateDialog from "../../../components/common/CreateDialog";
import {Mutation} from "react-apollo"
import Delete from "@material-ui/icons/Delete"
import deletePromotionMutation from "../../../graphql/promotion/mutation/delete-promotion";

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
        position: "relative"
    },
    cardContent: {
        flexGrow: 1,
    },
    tag: {
        backgroundColor: "#85d7a9",
        paddingRight: 10,
        paddingLeft: 10,
        marginLeft: 16,
        position: "absolute",
        bottom: 5,
        left: 0,
        borderRadius: 10,
    },
})

function PromotionCard(props) {
    const {promotion, title, subtitle, price, tag, image, thumbnail, id} = props
    const {classes} = props

    return (
        <Card className={classes.card}>

            <CardMedia
                className={classes.cardMedia}
                image={image}
                title={title}
                src="">
                <div className={classes.tag}>
                    <Typography>
                        {tag}
                    </Typography>
                </div>
            </CardMedia>


            <CardHeader
                action={
                    <div>
                        <CreateDialog type={"promotion"} data={promotion}/>
                        <Mutation mutation={deletePromotionMutation}>
                            {(deletePromotion, {data}) => (
                                <Tooltip TransitionComponent={Zoom} title="Delete">
                                    <IconButton onClick={() => {
                                        deletePromotion({variables: {id: promotion.id}});
                                        window.location.reload();
                                    }}>
                                        <Delete color={"primary"}/>
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Mutation>
                    </div>
                }
                title={title}
                subheader={"$" + price + " Shalibo Coins"}
            />


            <CardContent className={classes.cardContent}>
                <Typography> {subtitle}</Typography>
            </CardContent>

        </Card>
    )


}

PromotionCard.defaultProps = {
    saved: false,
}

PromotionCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PromotionCard)
