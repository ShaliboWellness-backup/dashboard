import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core"
import PromotionCard from "./PromotionCard"
import CreateDialog from "../../../components/common/CreateDialog";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
})

const Promotions = ({classes, promotions}) => {

    if (promotions) {
        return null
    } else {
        let promotions = []
    }
    return (
        <div className={classes.grid}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CreateDialog type="promotion" action={"create"}/>
                </Grid>
                {promotions.map((promotion, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                        <PromotionCard
                            promotion={promotion}
                            title={promotion.title}
                            subtitle={promotion.subtitle}
                            price={promotion.price}
                            tag={promotion.tag}
                            image={promotion.image}
                            thumbnail={promotion.thumbnail}
                            id={promotion.id}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Promotions)
