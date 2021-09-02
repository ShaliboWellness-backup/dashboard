import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import CurrentCompanyContext from '../../containers/CurrentCompany/CurrentCompanyContext';
import Sidebar from './Sidebar';
import AdminMenu from './AdminMenu';
import getCompaniesQuery from '../../graphql/companies/query/companies';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: '10px 15px 10px 10px',
    alignItems: 'center',

  },
  menuButton: {
    marginRight: 16,
  },
  toolbar: {
    alignItems: 'center',
    paddingTop: 0,
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
    fontWeight: 300,
    fontSize: '1rem',
  },
  usersButton: {
    marginRight: 10,
    textTransform: 'none',
    padding: '5px 10px',
  },
});

const HeaderTitle = ({ classes, currentPath }) => {
  const value = React.useContext(CurrentCompanyContext);

  const { handleSetCompany, currentCompany } = value;

  const client = useApolloClient();

  const [companies, setCompanies] = useState([{ name: 'Loading...', logo: '' }]);


  const getCompanies = () => {
    return client.watchQuery({
      query: getCompaniesQuery,
      pollInterval: 5000,
    }).subscribe(({ data }) => {
      setCompanies(data.companies);
      const lastCompanyId = localStorage.getItem('company_id');
      if (lastCompanyId) {
        const lastCompany = data.companies.filter((company) => company._id === lastCompanyId);
        if (lastCompany.length === 1) {
          handleSetCompany(lastCompany[0]);
        } else {
          localStorage.setItem('company_id', null);
          handleSetCompany(data.companies[0]);
        }
      } else {
        handleSetCompany(data.companies[0]);
      }
    },
      (error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let subscription = getCompanies();
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Sidebar currentPath={currentPath} />
        <div className={classes.title}>
          <Button classes={{ root: classes.usersButton }} component={Link} to="/">
            <Typography variant="h6" className={classes.title}>
              Shalibo Wellness
            </Typography>
          </Button>
        </div>
        <AdminMenu companies={companies} />
      </Toolbar>
    </div>
  );
};

export default withStyles(styles)(HeaderTitle);
