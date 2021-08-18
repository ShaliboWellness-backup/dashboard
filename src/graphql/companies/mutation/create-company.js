import gql from 'graphql-tag';

const createCompanyMutation = gql`
mutation CreateCompany($name: String!, $emailSuffix: String!, $logo: String){
  createCompany(name: $name, emailSuffix: $emailSuffix, logo: $logo){
    _id
    name
    logo
    events{
      title
    }
    
  }
}
`;

export default createCompanyMutation;
