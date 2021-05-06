import gql from "graphql-tag";


const removeUsersFromTeamMutation = gql`
mutation removeUsersFromTeam($tid: String!, $uids: [String]){
  removeUsersFromTeam(tid: $tid, uids: $uids) {
    _id
  }
}
`

export default removeUsersFromTeamMutation
