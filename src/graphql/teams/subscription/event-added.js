import gql from "graphql-tag";


const eventAdded = gql`
  subscription eventAdded{
    eventAdded{
    title
    }
  }
`

export default eventAdded
