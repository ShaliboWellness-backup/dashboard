import gql from "graphql-tag";


const deleteEventMutation = gql`
mutation deleteEvent($id: String!){
  deleteEvent(id: $id)
  {
    id
    title
  }
}
`

export default deleteEventMutation
