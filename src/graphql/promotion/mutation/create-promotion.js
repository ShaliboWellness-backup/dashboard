import gql from "graphql-tag";


const createPromotionMutation = gql`
mutation createPromotion($title: String!, $subtitle: String!, $price: String!, $tag: String!, $image: String!){
  createPromotion(title: $title, subtitle: $subtitle, tag: $tag, image: $image, price: $price){
    _id
    title
    subtitle
    image
    price
    tag
  }
}
`

export default createPromotionMutation
