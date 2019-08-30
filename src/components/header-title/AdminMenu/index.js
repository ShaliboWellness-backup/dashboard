import React from 'react';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import DropdownMenuCompanies from "./DropdownMenuCompanies";
import DropdownMenuProfile from "./DropdownMenuProfile";
import {IconButton, makeStyles} from "@material-ui/core";
import CurrentCompanyContext from "../../../containers/CurrentCompany/CurrentCompanyContext";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme'
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";


const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center"

    },
    menuButton: {
        marginRight: 16,
    },
    toolbar: {
        alignItems: "center",
        paddingTop: 0
    },
    title: {
        //flexGrow: 1,
        textTransform: "uppercase",
        fontWeight: 300,
        fontSize: "1rem"
    },
    usersButton: {
        marginRight: 10,
        textTransform: "none",
        padding: "5px 10px"
    },
    topMenu: {
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center"
    }
});


function AdminMenu({companies}) {

    const classes = useStyles();

    const value = React.useContext(CurrentCompanyContext)

    const {handleSetCompany, currentCompany} = value

    const [top, setTop] = React.useState(false);

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const list = () => (
        <div className={classes.root}>
            <Button classes={{root: classes.usersButton}} component={Link} to={"/all-users"}
                    onClick={() => setTop(false)}>
                <Typography variant="caption" color="textSecondary">
                    All Users
                </Typography>
            </Button>
            <Button classes={{root: classes.usersButton}} component={Link} to={"/trainers"}
                    onClick={() => setTop(false)}>
                <Typography variant="caption" color="textSecondary">
                    Trainers
                </Typography>
            </Button>
            <DropdownMenuCompanies companies={companies} className={classes.menuButton}
                                   handleSetCompany={handleSetCompany}/>
            <DropdownMenuProfile
                className={classes.menuButton}
            />
        </div>
    )

    return isMobile ?
        <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={() => setTop(true)}>
                <MoreVertIcon color={"textPrimary"}/>
            </IconButton>
            <SwipeableDrawer
                anchor={'top'}
                open={top}
                onClose={() => setTop(false)}
                onOpen={() => setTop(true)}

            >
                <div className={classes.topMenu}>
                    {list()}
                </div>
            </SwipeableDrawer>
        </div>
        :
        list()

}

export default AdminMenu;
