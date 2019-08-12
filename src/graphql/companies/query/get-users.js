import gql from 'graphql-tag';

const getCompanyUsersQuery = gql`
query getCompanyUsers($_id: String!){
   company(_id: $_id){
                users{
                  name
                  _id
                  email
                  username
                  company{
                    name
                  }
                }
              }
  
}

`


export default getCompanyUsersQuery
