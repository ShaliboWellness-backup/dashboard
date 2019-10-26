import gql from "graphql-tag";


const checkPromotionAvailabilityMutation = gql`
mutation CheckPromotionAvailability($_id: String!){
  checkPromotionAvailability(_id: $_id)
}
`

export default checkPromotionAvailabilityMutation
