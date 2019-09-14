import gql from "graphql-tag";


const updatePromotionMutation = gql`
mutation updatePromotion(
$_id: String!
  $title: String
  $subtitle: String
  $price: String
  $tag: String
  $image: String
  $codes: [String!]
) {
  updatePromotion(
  _id: $_id
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

export default updatePromotionMutation
