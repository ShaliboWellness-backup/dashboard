import gql from 'graphql-tag';

const getPromotionsQuery = gql`{
             promotions{
                title
                subtitle
                price
                codes{
                value
                }
                tag
                image
                _id
                }
                }
            `

export default getPromotionsQuery
