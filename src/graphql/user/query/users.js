import gql from 'graphql-tag';


const usersQuery = gql`
  query {
    users {
    _id
      name
      email
      username
      roles
    }
  }
`;

export default usersQuery;
