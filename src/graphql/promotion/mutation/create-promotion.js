import gql from "graphql-tag";


const createPromotionMutation = gql`
mutation createPromotion($title: String!, $subtitle: String!, $price: String!, $tag: String!, $image: String!){
  createPromotion(
  title: $title,
  subtitle: $subtitle,
  price: $price,
  tag: $tag,
  image: $image
    )
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

export default createPromotionMutation
