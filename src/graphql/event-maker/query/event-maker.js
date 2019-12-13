import gql from 'graphql-tag';

const EventMakersQuery = gql`
{
  eventMakers{
    _id
    title
    style
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
    cron
    company{
    _id
    
    }
  }
}
`

export default EventMakersQuery
