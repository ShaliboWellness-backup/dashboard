import gql from 'graphql-tag';

const getEventsQuery = gql`{
             getEvents{
                title
                instructor
                date
                location
                totalSpots
                takenSpots
                description
                image
                id
                }
                }
            `

export default getEventsQuery
