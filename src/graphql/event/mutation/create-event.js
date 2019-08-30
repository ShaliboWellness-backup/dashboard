import gql from "graphql-tag";


const createEventMutation = gql`
mutation createEvent(
  $title: String!
  $instructor: String!
  $location: String!
  $totalSpots: Int!
  $description: String!
  $image: String!
  $date: String!
) {
  createEvent(
    title: $title
    instructor: $instructor
    location: $location
    date: $date
    image: $image
    totalSpots: $totalSpots
    description: $description
  ) {
    _id
    title
    instructor {
      firstName
      lastName
      _id
    }
    location
    date
    image
    totalSpots
    description
  }
}


`

export default createEventMutation
