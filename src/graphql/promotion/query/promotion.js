import gql from 'graphql-tag';

const getPromotionsQuery = gql`{
             promotions{
                title
                subtitle
                price
                tag
                image
                _id
                }
                }
            `

export default getPromotionsQuery
