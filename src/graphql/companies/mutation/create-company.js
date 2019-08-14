import gql from "graphql-tag";


const createCompanyMutation = gql`
mutation CreateCompany($name: String!, $emailSuffix: String!){
  createCompany(name: $name, emailSuffix: $emailSuffix){
    _id
    name
    events{
      title
    }
    
  }
}
`

export default createCompanyMutation
