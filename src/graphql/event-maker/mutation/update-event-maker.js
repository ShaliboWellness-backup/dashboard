import gql from "graphql-tag";


const updateEventMakerMutation = gql`

mutation updateEventMakerMaker(
  $_id: String!
  $title: String
  $instructor: String
  $location: String
  $totalSpots: Int
  $description: String
  $image: String
  $date: String
  $coins: Int
  $company: String
  $cron: String
) {
  updateEventMaker(
    _id: $_id
    title: $title
    instructor: $instructor
    location: $location
    date: $date
    image: $image
    totalSpots: $totalSpots
    description: $description
    coins: $coins
    company: $company
    cron: $cron
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
    company {
      _id
    }
    coins
  }
}



`

export default updateEventMakerMutation
