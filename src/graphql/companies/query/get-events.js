import gql from 'graphql-tag';

const getCompanyEventsQuery = gql`
query getCompanyEvents($_id: String!){
   company(_id: $_id){
    events{
    _id
    title
    style
    instructor{
    _id
      firstName
      lastName
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
    enablePush
    isLive
    zoomUrl
    verifiedUsers{
      _id
    }
  }
                }
              }
  


`


export default getCompanyEventsQuery
