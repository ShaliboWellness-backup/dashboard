import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import {CardHeader} from "@material-ui/core"
import ActionMenu from "../../../components/common/ActionMenu";
import {withStyles} from "@material-ui/styles"
import CardActions from "@material-ui/core/CardActions";


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
    cardHeader: {
        alignItems: "flex-start"
    },
    cardMedia: {
        paddingTop: "56.25%", // 16:9
        position: "relative",

    },
    cardContent: {
        flexGrow: 1,
        paddingTop: 0
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


const PromotionCard = (props) => {
    const {promotion, title, subtitle, price, tag, image,} = props
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
                className={classes.cardHeader}
                action={<ActionMenu card={promotion} promotion/>}
                title={title}
                subheader={"$" + price + " Shalibo Coins"}
            />


            <CardContent className={classes.cardContent}>
                <Typography> {subtitle}</Typography>
            </CardContent>
            <CardActions>
                <div style={{textAlign: "center", width: "100%"}}>
                    <Typography color={'primary'} variant={'caption'}>
                        {!!promotion.codes && promotion.codes.length > 1 ? `${promotion.codes.length} codes left` : 'No available codes'}
                    </Typography>
                </div>
            </CardActions>
        </Card>
    )

}


export default withStyles(styles)(PromotionCard)
