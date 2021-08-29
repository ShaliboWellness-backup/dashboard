import gql from 'graphql-tag';

const createTeamMutation = gql`
mutation createTeam(
  $name: String!
  $companyId: String!
) {
  createTeam(
    name: $name
    companyId: $companyId
  ) {
    _id
    name
  }
}


`;

export default createTeamMutation;
