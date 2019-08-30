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
      firstName
      lastName
      email
    }
    location
    date
    totalSpots
    description
    image
  }
}
`

export default getEventsQuery
