import gql from "graphql-tag";


const updatePromotionMutation = gql`
mutation updatePromotion($_id: String!, $title: String!, $subtitle: String!, $price: String!, $tag: String!, $image: String!){
  updatePromotion(
  _id: $_id
  title: $title,
  subtitle: $subtitle,
  price: $price,
  tag: $tag,
  image: $image)
  {
   title
   subtitle
   price
   tag
   image
   _id
}
}
`

export default updatePromotionMutation
