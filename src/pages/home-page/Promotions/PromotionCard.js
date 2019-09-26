import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import {CardHeader, Switch} from "@material-ui/core"
import ActionMenu from "../../../components/common/ActionMenu";
import {withStyles} from "@material-ui/styles"
import CardActions from "@material-ui/core/CardActions";
import updateCompanyMutation from "../../../graphql/companies/mutation/update-company";
import {useApolloClient} from "@apollo/react-hooks";
import removePromotionMutation from "../../../graphql/companies/mutation/remove-promotion";
import CurrentCompanyContext from "../../../containers/CurrentCompany/CurrentCompanyContext";


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
        transition: 'filter 1s'


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
    const {promotion, title, subtitle, price, tag, image, companyPromotions, edit} = props
    const [active, setActive] = React.useState(props.active)
    const {classes} = props
    const {currentCompany} = React.useContext(CurrentCompanyContext)

    const client = useApolloClient()

    console.log(props.active)
    const handleSwitch = () => {
        setActive(!active)
        client.mutate({
            mutation: active ? removePromotionMutation : updateCompanyMutation,
            variables: active ? {
                companyId: currentCompany._id,
                promotionId: promotion._id
            } : {
                _id: currentCompany._id,
                promotionsIds: promotion._id
            }
        })
            .then(() => {
                return
            })
            .catch((error) => console.log(error))
    }

    React.useEffect(() => {
        edit ? setActive(true) : setActive(companyPromotions.filter((item) => item._id == promotion._id).length > 0)
    }, [props])


    return (
        <Card className={classes.card}
              style={{filter: active ? 'grayscale(0%)' : 'grayscale(100%)'}}>

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
            <CardActions style={{padding: 8}}>
                {!edit && <Switch onChange={handleSwitch} color={"primary"} checked={active ? true : false}/>}
                {!edit && <Typography color={'primary'} variant={'caption'}>
                    {active ? 'Active' : 'Inactive'}
                </Typography>}
                <div style={{textAlign: "right", width: "100%"}}>
                    <Typography color={!!promotion.codes && promotion.codes.length > 1 ? 'primary' : 'secondary'}
                                variant={'caption'}>
                        {!!promotion.codes && promotion.codes.length > 1 ? `${promotion.codes.length} codes left` : 'No available codes'}
                    </Typography>
                </div>
            </CardActions>
        </Card>
    )

}


export default withStyles(styles)(PromotionCard)
