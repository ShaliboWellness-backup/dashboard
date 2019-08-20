import gql from 'graphql-tag';


const usersQuery = gql`
  query {
    users {
    _id
      name
      email
      username
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
