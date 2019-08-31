import gql from 'graphql-tag';

const getCompanyUsersQuery = gql`
query getCompanyUsers($_id: String!){
   company(_id: $_id){
                users{
                  firstName
                  lastName
                  _id
                  email
                  verified
                  phone
                }
              }
  
}

`


export default getCompanyUsersQuery
