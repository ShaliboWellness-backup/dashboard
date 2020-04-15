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
  $isLive: Boolean
  $zoomUrl: String
) {
  createEvent(
    title: $title
    style: $style
    instructor: $instructor
    location: $location
    date: $date
    image: $image
    totalSpots: $totalSpots
    description: $description
    coins: $coins
    enablePush: $enablePush
    isLive: $isLive
    zoomUrl: $zoomUrl
  ) {
    _id
    title
    style
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
    isLive
    zoomUrl
  }
}


`

export default createEventMutation
