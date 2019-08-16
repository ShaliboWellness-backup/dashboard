import gql from 'graphql-tag';

const updateRoleMutation = gql`
mutation updateRole($_id: String!, $roles: [Role!]!){
  updateRole(roles: $roles, _id: $_id){
    name
    roles
  }
}
`;

export default updateRoleMutation;
