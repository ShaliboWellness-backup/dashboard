import gql from "graphql-tag";


const deletePromotionMutation = gql`
mutation deletePromotion($id: String!){
  deletePromotion(id: $id)
  {
    id
    title
  }
}
`

export default deletePromotionMutation
