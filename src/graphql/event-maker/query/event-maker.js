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
    enablePush
    users{
    _id
      firstName
      lastName
      email
    }
    location
    date
    dateEnd
    totalSpots
    description
    image
    coins
    cron
    isLive
    zoomUrl
    company{
    _id
    
    }
  }
}
`

export default EventMakersQuery
