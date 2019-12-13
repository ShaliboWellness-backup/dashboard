import gql from "graphql-tag";


const createEventMutation = gql`
mutation createEvent(
  $title: String!
  $style: Style!
  $instructor: String!
  $location: String!
  $totalSpots: Int!
  $description: String!
  $image: String!
  $date: String!
  $coins: Int!
  $enablePush: Boolean!
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
    enablePush: $enablePush
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
    enablePush
  }
}


`

export default createEventMutation
