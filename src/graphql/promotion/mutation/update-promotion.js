import gql from "graphql-tag";


const updatePromotionMutation = gql`
mutation updatePromotion($id: String!, $title: String!, $subtitle: String!, $price: String!, $tag: String!, $image: String!){
  updatePromotion(
  id: $id
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
   id
}
}
`

export default updatePromotionMutation
