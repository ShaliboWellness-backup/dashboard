import gql from "graphql-tag";


const updateUserMutation = gql`
mutation updateUser(
  $_id: String!
  $name: String
  $email: String
  $company: String
  $roles: [Role!]
  $verified: Boolean
) {
  updateUser(
    _id: $_id
    name: $name
    email: $email
    company: $company
    roles: $roles
    verified: $verified
  ) {
    _id
    name
    email
    company{
    _id
    name
    }
    roles
    verified
  }
}


`

export default updateUserMutation
