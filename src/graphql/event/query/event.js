import gql from 'graphql-tag';

const getEventsQuery = gql`
{
  events{
    _id
    title
    instructor{
      name
    }
    users{
      name
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
