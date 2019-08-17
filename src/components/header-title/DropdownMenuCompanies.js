import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Avatar, Button, ListItemAvatar, Typography} from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import NewCompany from "../common/NewCompany";

const styles = () => ({
    button: {
        textTransform: "none"
    },
})

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        marginTop: 5,
        marginBottom: 5,
        // '&:focus': {
        //     backgroundColor: theme.palette.primary.main,
        //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //         color: theme.palette.common.white,
        //     },
        // },
    },
}))(MenuItem);

const DropdownMenuCompanies = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [company, setCompany] = React.useState(props.companies[0]);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);

    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleChangeCompany(company) {
        setCompany(company)
        props.handleSetCompany(company)
        handleClose()
    }

    const {companies, classes} = props
    return (
        <div style={{marginRight: 20}}>
            <Button
                classes={{root: classes.button}}
                variant={"text"}
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >

                <Grid container spacing={1}>
                    <Grid item xs={12}
                          style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
                        <KeyboardArrowDown style={{fontSize: "1rem"}}/>
                        <Typography variant="caption" color="textSecondary">
                            {company.name}
                        </Typography>
                        {/*<Avatar style={{width: 30, height: 30}} alt={company.name} src={company.image}/>*/}
                    </Grid>
                    {/*<Grid item xs={12}>*/}

                    {/*</Grid>*/}
                </Grid>

            </Button>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <NewCompany closeMenu={handleClose}/>
                {companies.map((company) => {
                        return (
                            <StyledMenuItem onClick={() => handleChangeCompany(company)}>
                                <ListItemAvatar>
                                    <Avatar alt={company.name} src={company.logo}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primaryTypographyProps={{variant: "body1", color: "textSecondary"}}
                                    primary={company.name}/>
                            </StyledMenuItem>
                        )
                    }
                )
                }


            </StyledMenu>

        </div>
    );
}

export default withStyles(styles)(DropdownMenuCompanies)
