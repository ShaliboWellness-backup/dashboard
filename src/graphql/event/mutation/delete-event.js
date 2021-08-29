import gql from 'graphql-tag';

const deleteEventMutation = gql`
mutation deleteEvent($_id: String!){
  deleteEvent(_id: $_id)
}
`;

export default deleteEventMutation;
