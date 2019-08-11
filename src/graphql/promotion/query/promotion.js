import gql from 'graphql-tag';

const getPromotionsQuery = gql`{
             getPromotions{
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
