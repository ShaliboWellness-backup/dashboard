import gql from "graphql-tag";


const deleteEventMakerMutation = gql`
mutation deleteEventMaker($_id: String!){
  deleteEventMaker(_id: $_id)
}
`

export default deleteEventMakerMutation
