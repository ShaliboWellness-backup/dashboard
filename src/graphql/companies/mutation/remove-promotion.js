import gql from "graphql-tag";


const removePromotionMutation = gql`

mutation RemovePromotion($companyId: String!, $promotionId: String!) {
    removePromotion(companyId: $companyId, promotionId: $promotionId)
}

`

export default removePromotionMutation



