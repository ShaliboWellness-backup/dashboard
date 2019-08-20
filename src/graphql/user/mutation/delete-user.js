import gql from "graphql-tag";


const deleteUserMutation = gql`
mutation deleteUser($_id: String!){
  deleteUser(_id: $_id)
}
`

export default deleteUserMutation
