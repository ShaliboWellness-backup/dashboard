import gql from "graphql-tag";


const updateUserMutation = gql`
mutation updateUser(
  $_id: String!
  $firstName: String
  $lastName: String
  $phone: String
  $email: String
  $company: String
  $roles: [Role!]
  $verified: Boolean
) {
  updateUser(
    _id: $_id
    firstName: $firstName
    lastName: $lastName
    phone: $phone
    email: $email
    company: $company
    roles: $roles
    verified: $verified
  ) {
    _id
    firstName
      lastName
      phone
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
