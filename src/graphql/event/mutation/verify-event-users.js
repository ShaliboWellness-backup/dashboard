import gql from 'graphql-tag';

const verifyEventUsersMutation = gql`
mutation verifyEventUsers(
  $_id: String!
  $usersIds: [String!]!
) {
  verifyEventUsers(
    _id: $_id
    usersIds: $usersIds
  ) {
    title
    verifiedUsers{
    _id
    }
  }
}


`;

export default verifyEventUsersMutation;
