import gql from 'graphql-tag';

const getCompanyQuery = gql`
  query getCompany($_id: String!){
    company(_id: $_id) {
      name
      _id
      codes
      masterCode
      leaderboardAvailable
      competitionMode
      contentEnabled
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

export default getCompanyQuery;
