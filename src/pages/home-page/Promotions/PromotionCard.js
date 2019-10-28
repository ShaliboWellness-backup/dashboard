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
import SnackbarContext from "../../../containers/CustomSnackbar/SnackbarContext";
import checkPromotionAvailabilityMutation from "../../../graphql/promotion/mutation/check-promotion-availability";


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
    const {openSnackbar} = React.useContext(SnackbarContext)

    const client = useApolloClient()

    const [hasAvailableCodes, setHasAvailableCodes] = React.useState(false)

    const unusedCodes = promotion.codes.filter(item => item.consumedBy === null)

    console.log(props.active)
    const handleSwitch = () => {
        if (hasAvailableCodes) {
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
        } else {
            openSnackbar('error', "Please enter additional codes before activating.")
        }
    }

    const onCodesEmpty = () => {
        setActive(false)
        client.mutate({
            mutation: removePromotionMutation,
            variables: {
                companyId: currentCompany._id,
                promotionId: promotion._id
            }
        })
            .then(() => {
                return
            })
            .catch((error) => console.log(error))
    }

    const handleCheckCodes = () => {
        client.mutate({
            mutation: checkPromotionAvailabilityMutation,
            variables: {_id: promotion._id}
        })
            .then(({data}) => {
                const {checkPromotionAvailability} = data
                setHasAvailableCodes(checkPromotionAvailability)
                edit ? setActive(true)
                    :
                    checkPromotionAvailability ?
                        setActive(companyPromotions.filter((item) => item._id == promotion._id).length > 0)
                        :
                        onCodesEmpty()
            })
            .catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        handleCheckCodes()
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
                    <Typography color={!!unusedCodes && unusedCodes.length > 0 ? 'primary' : 'secondary'}
                                variant={'caption'}>
                        {!!unusedCodes && unusedCodes.length > 0 ? `${unusedCodes.length} codes left` : 'No available codes'}
                    </Typography>
                </div>
            </CardActions>
        </Card>
    )

}


export default withStyles(styles)(PromotionCard)
