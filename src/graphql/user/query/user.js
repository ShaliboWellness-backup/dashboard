import gql from 'graphql-tag';

const userQuery = gql`
{
  user {
    _id
    firstName
    lastName
    phone
    email
    roles
    company {
      _id
      name
    }
  }
}
`;

export default userQuery;
