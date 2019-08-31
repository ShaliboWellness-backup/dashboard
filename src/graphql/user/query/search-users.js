import gql from 'graphql-tag';


const searchUsersQuery = gql`
query searchUsers(
  $firstName: String
  $lastName: String
  $email: String
  $phone: String
  $offset: Int
  $limit: Int
) {
  searchUsers(
    firstName: $firstName
    lastName: $lastName
    email: $email
    phone: $phone
    offset: $offset
    limit: $limit
  ) {
    _id
    firstName
    lastName
    email
    phone
    roles
    verified
    company {
      _id
      name
    }
  }
}
`;

export default searchUsersQuery;
