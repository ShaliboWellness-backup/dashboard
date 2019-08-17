import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DropdownMenuProfile from './DropdownMenuProfile';
import DropdownMenuCompanies from './DropdownMenuCompanies';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import {Query} from "react-apollo";
import getCompaniesQuery from "../../graphql/companies/query/companies";
import Grid from "@material-ui/core/Grid";
import {CircularProgress} from "@material-ui/core";
import {Link} from 'react-router-dom'


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: "10px 15px 10px 10px",
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
        flexGrow: 1,
        textTransform: "uppercase",
        fontWeight: 300,
        fontSize: "1rem"
    },
    usersButton: {
        marginRight: 10,
        textTransform: "none",
        padding: "5px 10px"
    }
});


class HeaderTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCompany: '',
        };
    }


    handleCompanySelect = () => {
        this.setState({});
    }


    render() {
        const {classes} = this.props;
        const {handleSetCompany, currentCompany} = this.context;

        // console.log(currentCompany)
        return (
            <div className={classes.root}>
                {/* <AppBar position="static" color={"secondary"}> */}
                <Toolbar className={classes.toolbar}>
                    <div className={classes.title}>
                        <Button classes={{root: classes.usersButton}} component={Link} to={"/"}>
                            <Typography variant="h6" className={classes.title}>
                                Shalibo Wellness
                            </Typography>
                        </Button>
                    </div>
                    <Button classes={{root: classes.usersButton}} component={Link} to={"/all-users"}>
                        <Typography variant="caption" color="textSecondary">
                            All Users
                        </Typography>
                    </Button>
                    <Button classes={{root: classes.usersButton}} component={Link} to={"/trainers"}>
                        <Typography variant="caption" color="textSecondary">
                            Trainers
                        </Typography>
                    </Button>
                    <Query query={getCompaniesQuery}>
                        {({loading, error, data}) => {
                            console.log(data)
                            let companies = []
                            if (loading) {
                                return <Typography style={{marginRight: 20}} variant="caption" color="textSecondary">
                                    Loading...
                                </Typography>
                            }
                            if (error) {
                                console.log(`Error! ${error.message}`)
                                return null
                            }

                            if (!loading && !!data) {
                                console.log(data)
                                let {companies} = data
                                if (currentCompany === null) {
                                    handleSetCompany(companies[0])
                                }


                                return (
                                    <DropdownMenuCompanies companies={companies} className={classes.menuButton}
                                                           handleSetCompany={handleSetCompany}/>
                                )
                            }

                        }}
                    </Query>
                    < DropdownMenuProfile
                        className={classes.menuButton}
                    />

                </Toolbar>
                {/* </AppBar> */}
            </div>
        );
    }
}

HeaderTitle.contextType = CurrentCompanyContext;

export default withStyles(styles)(HeaderTitle);
