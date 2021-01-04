import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from "@material-ui/core"
import PromotionCard from "./PromotionCard"
import CreateDialog from "../../../components/common/CreateDialog";
import {company1} from '../../../fakeData/company1'
import CurrentCompanyContext from "../../../containers/CurrentCompany/CurrentCompanyContext";
import EventMakerDialog from "../EventMaker/EventMakerDialog";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    header: {
        display: "flex",
        textAlign: "center",
        width: "100%",
        marginBottom: 32,
        justifyContent: "center",
        position: "relative"
    },
})

const Promotions = ({classes, promotions, edit = false}) => {

    const {currentCompany} = React.useContext(CurrentCompanyContext)
    const companyPromotions = (!!currentCompany && !!currentCompany.promotions) ? currentCompany.promotions : []
    return (
        <div className={classes.grid}>
            <div className={classes.header}>
                {edit && <CreateDialog type="promotion" action={"create"}/>}
                <Typography gutterBottom variant={"h4"}>
                    {edit ? 'All Promotions' : `${!!currentCompany && currentCompany.name} Promotions`}
                </Typography>
            </div>
            <Grid container spacing={2}>
                {promotions.map((promotion, index) => {

                    return (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                            <PromotionCard
                                promotion={promotion}
                                title={promotion.title}
                                subtitle={promotion.subtitle}
                                price={promotion.price}
                                tag={promotion.tag}
                                image={promotion.image}
                                thumbnail={promotion.thumbnail}
                                id={promotion._id}
                                companyPromotions={companyPromotions}
                                edit={edit}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Promotions)
