import gql from 'graphql-tag';

const deleteCompanyMutation = gql`
mutation deleteCompany($_id: String!){
  deleteCompany(_id: $_id)
  {
    _id
    name
  }
}
`;

export default deleteCompanyMutation;
