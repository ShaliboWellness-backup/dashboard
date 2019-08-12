import gql from 'graphql-tag';


const userQuery = gql`
  query {
    user {
    _id
      name
      email
      username
      roles
    }
  }
`;

export default userQuery;
