import gql from "graphql-tag";


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
    instructor {
      _id
      firstName
      lastName
    }
    location
    date
    image
    users {
      firstName
      lastName
      _id
    }
    totalSpots
    description
    verifiedUsers{
    _id
    }
  }
}


`

export default verifyEventUsersMutation
