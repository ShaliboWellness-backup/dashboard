import gql from "graphql-tag";


const deletePromotionMutation = gql`
mutation deletePromotion($_id: String!){
  deletePromotion(_id: $_id)
}
`

export default deletePromotionMutation
