import gql from 'graphql-tag';

const getEventsQuery = gql`
{
  events{
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
    dateEnd
    totalSpots
    description
    image
    coins
    enablePush
    isLive
    zoomUrl
    verifiedUsers{
      _id
    }
  }
}
`;

export default getEventsQuery;
