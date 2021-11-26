import gql from 'graphql-tag';

const createEventMutation = gql`
mutation createEvent(
  $title: String!
  $company: String!
  $style: Style!
  $instructor: String!
  $location: String!
  $totalSpots: Int!
  $description: String!
  $image: String!
  $date: String!
  $dateEnd: String!
  $duration: Int!
  $coins: Int!
  $enablePush: Boolean!
  $isLive: Boolean
  $zoomUrl: String
) {
  createEvent(
    title: $title
    company: $company
    style: $style
    instructor: $instructor
    location: $location
    date: $date
    dateEnd: $dateEnd
    duration: $duration
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
    dateEnd
    company {
      _id
    }
    duration
    image
    totalSpots
    description
    coins
    enablePush
    isLive
    zoomUrl
  }
}


`;

export default createEventMutation;
