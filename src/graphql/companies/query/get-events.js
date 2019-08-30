import gql from 'graphql-tag';

const getCompanyEventsQuery = gql`
query getCompanyEvents($_id: String!){
   company(_id: $_id){
    events{
    _id
    title
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
  }
                }
              }
  


`


export default getCompanyEventsQuery
