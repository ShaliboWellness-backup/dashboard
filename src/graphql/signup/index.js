import gql from 'graphql-tag';

const signupMutation = gql`

mutation signup($name: String!, $email: String!, $username: String!, $password: String!){
  signup(name: $name, email: $email, username: $username, password: $password){
    token
  }
}
`

export default signupMutation
