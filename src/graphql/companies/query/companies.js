import gql from 'graphql-tag';

const getCompaniesQuery = gql`
  {
    companies {
      name
      _id
      codes
      masterCode
      leaderboardAvailable
      events {
        title
      }
      promotions {
        _id
        title
        subtitle
        price
        tag
        image
        codes {
          value
        }
      }
      users {
        _id
        firstName
        lastName
        email
      }
      logo
      emailSuffix
      isPublic
    }
  }
`;

export default getCompaniesQuery;
