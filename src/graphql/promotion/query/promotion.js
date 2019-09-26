import gql from 'graphql-tag';

const getPromotionsQuery = gql`{
             promotions{
               _id
                title
                subtitle
                price
                tag
                image
                codes{
                value
                }
                }
                }
            `

export default getPromotionsQuery
