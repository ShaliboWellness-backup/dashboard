import gql from 'graphql-tag';

const getEventsQuery = gql`
{
  events{
    _id
    title
    instructor{
      firstName
      lastName
      _id
    }
    users{
    _id
      firstName
      lastName
      email
    }
    location
    date
    totalSpots
    description
    image
    coins
    verifiedUsers{
      _id
    }
  }
}
`

export default getEventsQuery
