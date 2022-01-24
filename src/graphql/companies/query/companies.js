import gql from 'graphql-tag';

const getCompaniesQuery = gql`
  {
    copmanies {
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
