import gql from 'graphql-tag';

const getCompaniesQuery = gql`
  {
    companies {
      name
      _id
      codes
      masterCode
      leaderboardAvailable
      competitionMode
      events {
        _id
      }
      promotions {
        _id
      }
      users {
        _id
        firstName
        lastName
      }
      logo
      emailSuffix
      isPublic
    }
  }
`;

export default getCompaniesQuery;
