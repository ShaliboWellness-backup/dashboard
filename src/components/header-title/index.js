import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DropdownMenuProfile from './DropdownMenuProfile';
import DropdownMenuCompanies from './DropdownMenuCompanies';
import {companies} from '../../fakeData';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import {Query} from "react-apollo";
import getCompaniesQuery from "../../graphql/companies/query/companies";


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
                    <Typography variant="h6" className={classes.title}>
                        Dashboard
                    </Typography>
                    <Query query={getCompaniesQuery}>
                        {({loading, error, data}) => {
                            console.log(data)

                            if (loading) {
                                return <p>loading...</p>
                            }
                            if (error) {
                                console.log(`Error! ${error.message}`)
                            }
                            if (!loading) {
                                console.log(data)
                                const {companies} = data
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
