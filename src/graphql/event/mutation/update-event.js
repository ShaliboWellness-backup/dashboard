import gql from "graphql-tag";


const updateEventMutation = gql`
mutation updateEvent(
  $_id: String!
  $title: String
  $instructor: String
  $location: String
  $totalSpots: Int
  $description: String
  $image: String
  $date: String
) {
  updateEvent(
    _id: $_id
    title: $title
    instructor: $instructor
    location: $location
    date: $date
    image: $image
    totalSpots: $totalSpots
    description: $description
  ) {
    title
    instructor {
      _id
      name
    }
    location
    date
    image
    users {
      name
      _id
    }
    totalSpots
    description
  }
}


`

export default updateEventMutation
