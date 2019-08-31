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
  $coins: Int!
) {
  createEvent(
    title: $title
    instructor: $instructor
    location: $location
    date: $date
    image: $image
    totalSpots: $totalSpots
    description: $description
    coins: $coins
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
    coins
  }
}


`

export default createEventMutation
