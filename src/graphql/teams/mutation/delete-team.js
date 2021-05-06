import gql from "graphql-tag";


const deleteTeamMutation = gql`
mutation deleteTeam($_id: String!){
  deleteTeam(_id: $_id)
}
`

export default deleteTeamMutation
