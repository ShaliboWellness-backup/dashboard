import React, {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import Sidebar from "./Sidebar";
import AdminMenu from "./AdminMenu";
import {useApolloClient} from '@apollo/react-hooks'
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
    usersButton: {
        marginRight: 10,
        textTransform: "none",
        padding: "5px 10px"
    }
});


const HeaderTitle = ({classes}) => {

    const value = React.useContext(CurrentCompanyContext)

    const {handleSetCompany, currentCompany} = value

    const client = useApolloClient()

    const getCompanies = () => {
        client.watchQuery({
            query: getCompaniesQuery,
            pollInterval: 500
        }).subscribe(({data}) => {
                setCompanies(data.companies)
                handleSetCompany(data.companies[0])
            },
            error => {
                console.log(error)
            })

    }

    const [companies, setCompanies] = useState([{name: "Loading...", logo: ""}])

    useEffect(() => {
        getCompanies()
    }, []);

    return (
        <div className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Sidebar companies={companies}/>
                <div className={classes.title}>
                    <Button classes={{root: classes.usersButton}} component={Link} to={"/"}>
                        <Typography variant="h6" className={classes.title}>
                            Shalibo Wellness
                        </Typography>
                    </Button>
                </div>
                <AdminMenu companies={companies}/>
            </Toolbar>
        </div>
    )

}


export default withStyles(styles)(HeaderTitle);
