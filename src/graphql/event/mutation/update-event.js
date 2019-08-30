import gql from "graphql-tag";


const updateEventMutation = gql`
mutation updateEvent(
  $_id: String!
  $title: String
  $instructor: String
  $location: String
  $totalSpots: Int
  $users: [String!]
  $description: String
  $image: String
  $date: String
) {
  updateEvent(
    _id: $_id
    title: $title
    instructor: $instructor
    location: $location
    totalSpots: $totalSpots
    users: $users
    description: $description
    image: $image
    date: $date
  ) {
    title
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
  }
}


`

export default updateEventMutation
