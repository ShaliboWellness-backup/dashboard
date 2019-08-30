import gql from 'graphql-tag';

const updateRoleMutation = gql`
mutation updateRole($_id: String!, $roles: [Role!]!){
  updateRole(roles: $roles, _id: $_id){
    firstName
    lastName
    roles
  }
}
`;

export default updateRoleMutation;
