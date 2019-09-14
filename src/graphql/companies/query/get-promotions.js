import gql from 'graphql-tag';

const getCompanyPromotionsQuery = gql`
query getCompanyPromotions($_id: String!){
   company(_id: $_id){
   promotions{
    _id
    title
    subtitle
    price
    tag
    image
    codes{
    value
    }
  }
                }
              }
  


`


export default getCompanyPromotionsQuery
