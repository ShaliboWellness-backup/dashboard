import gql from "graphql-tag";


const updateCompanyMutation = gql`
mutation updateCompany(
  $_id: String!
  $name: String
  $logo: String
  $emailSuffix: String
  $eventsIds: [String!]
  $usersIds: [String!]
  $promotionsIds: [String!]
) {
  updateCompany(
    _id: $_id
    name: $name
    logo: $logo
    emailSuffix: $emailSuffix
    eventsIds: $eventsIds
    usersIds: $usersIds
    promotionsIds: $promotionsIds
    
  ) {
    _id
    name
    emailSuffix
    logo
    events {
      _id
      title
    }
    promotions {
      _id
      title
    }
    users {
      _id
      name
    }
  }
}

`

export default updateCompanyMutation
