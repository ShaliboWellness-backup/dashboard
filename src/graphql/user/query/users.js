import gql from 'graphql-tag';


const usersQuery = gql`
  query {
    users {
    _id
      firstName
      lastName
      email
      phone
      roles
      verified
      company{
      _id
      name
      }
    }
  }
`;

export default usersQuery;
