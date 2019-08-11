import gql from 'graphql-tag';

const getEventsQuery = gql`
{
  events{
    _id
    title
    instructor{
      name
    }
    attendees{
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
