import gql from "graphql-tag";


const updateEventMakerMutation = gql`

mutation updateEventMakerMaker(
  $_id: String!
  $title: String
  $style: Style
  $instructor: String
  $location: String
  $totalSpots: Int
  $description: String
  $image: String
  $date: String
  $dateEnd: String
  $coins: Int
  $company: String
  $cron: String
  $enablePush: Boolean
  $isLive: Boolean
  $zoomUrl: String
) {
  updateEventMaker(
    _id: $_id
    title: $title
    style: $style
    instructor: $instructor
    location: $location
    date: $date
    dateEnd: $dateEnd
    image: $image
    totalSpots: $totalSpots
    description: $description
    coins: $coins
    company: $company
    cron: $cron
    enablePush: $enablePush
    isLive: $isLive
    zoomUrl: $zoomUrl
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
    dateEnd
    image
    totalSpots
    description
    company {
      _id
    }
    coins
    enablePush
    isLive
    zoomUrl
  }
}



`

export default updateEventMakerMutation
