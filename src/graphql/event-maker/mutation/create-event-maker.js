import gql from "graphql-tag";


const createEventMakerMutation = gql`
mutation createEventMaker(
  $title: String!
  $style: Style!
  $instructor: String!
  $location: String!
  $totalSpots: Int!
  $description: String!
  $image: String!
  $date: String!
  $coins: Int!
  $company: String!
  $cron: String!
) {
  createEventMaker(
    title: $title
    style: $style
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
    company{
      _id
      
    }
    coins
  }
}

`

export default createEventMakerMutation
