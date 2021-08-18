import gql from 'graphql-tag';

const companyTeamsQuery = gql`

  query companyTeams($companyId: String!) {
    companyTeams(companyId: $companyId) {
      name,
      users {
        firstName,
        lastName,
        email,
        phone,
        steps,
        _id
      },
      _id
    }
  }

`;

export default companyTeamsQuery;
