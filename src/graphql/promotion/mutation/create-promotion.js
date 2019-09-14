import gql from "graphql-tag";


const createPromotionMutation = gql`
mutation createPromotion(
  $title: String!
  $subtitle: String!
  $price: String!
  $tag: String!
  $image: String!
  $codes: [String!]
) {
  createPromotion(
    title: $title
    subtitle: $subtitle
    tag: $tag
    image: $image
    price: $price
    codes: $codes
  ) {
    _id
    title
    subtitle
    image
    price
    tag
    codes {
      value
    }
  }
}

`

export default createPromotionMutation
