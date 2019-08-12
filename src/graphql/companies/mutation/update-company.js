import gql from "graphql-tag";


const updateCompanyMutation = gql`
mutation updateCompany($_id: String!, $eventsIds: [String!],
  $usersIds: [String!], $promotionsIds: [String!]
){
  updateCompany(_id: $_id, eventsIds: $eventsIds,
  usersIds: $usersIds, promotionsIds: $promotionsIds){
    _id
    name
    events{
    _id
      title
    }
    promotions{
    _id
      title
    }
    users{
    _id
      name
    }
  }
}
`

export default updateCompanyMutation
