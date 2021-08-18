import gql from 'graphql-tag';

const updateEventMutation = gql`
mutation updateEvent($id: String!, $title: String!, $instructor: String!, $location: String!, $takenSpots: String!, $totalSpots: String!, $description: String!, $image: String!, $date: String!){
  updateEvent(
    id: $id,
    title: $title,
    instructor: $instructor,
    location: $location,
    date: $date,
    image: $image,
    takenSpots: $takenSpots,
    totalSpots: $totalSpots,
    description: $description
    )
  {
    title
    instructor
    location
    date
    image
    takenSpots
    totalSpots
    description
  }
}
`;

export default updateEventMutation;
