import gql from 'graphql-tag';

const updateTeamMutation = gql`
mutation updateTeam(
  $_id: String!
  $name: String!
  $logo: String
) {
  updateTeam(
    _id: $_id
    name: $name
    logo: $logo
  ) {
    _id
    name
    users {
      firstName
      lastName
      steps
      _id
    }
  }
}


`;

export default updateTeamMutation;
