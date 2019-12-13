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
  $enablePush: Boolean!
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
    company{
      _id
      
    }
    coins
    enablePush
  }
}

`

export default createEventMakerMutation
