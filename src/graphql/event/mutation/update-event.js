import gql from "graphql-tag";


const updateEventMutation = gql`
mutation updateEvent(
  $_id: String!
  $title: String
  $style: Style
  $instructor: String
  $location: String
  $totalSpots: Int
  $users: [String!]
  $description: String
  $image: String
  $date: String
  $coins: Int
  $enablePush: Boolean
  $isLive: Boolean
  $zoomUrl: String
) {
  updateEvent(
    _id: $_id
    title: $title
    style: $style
    instructor: $instructor
    location: $location
    totalSpots: $totalSpots
    users: $users
    description: $description
    image: $image
    date: $date
    coins: $coins
    enablePush: $enablePush
    isLive: $isLive
    zoomUrl: $zoomUrl
  ) {
    title
    style
    instructor {
      _id
      firstName
      lastName
    }
    location
    date
    image
    users {
      firstName
      lastName
      _id
    }
    totalSpots
    description
    coins
    enablePush
    isLive
    zoomUrl
  }
}


`

export default updateEventMutation
