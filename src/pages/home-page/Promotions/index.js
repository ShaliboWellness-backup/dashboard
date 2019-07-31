import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core"
import PromotionCard from "./PromotionCard"

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
})

const Promotions = ({classes, company}) => {


    return (
        <div className={classes.grid}>
            <Grid container spacing={2}>
                {company.promotions.map((promotion , index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                        <PromotionCard
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
