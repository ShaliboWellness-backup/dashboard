import gql from 'graphql-tag';

const signupMutation = gql`

mutation signup(
  $firstName: String!
  $lastName: String!
  $phone: String!
  $email: String!
  $password: String!
) {
  signup(
    firstName: $firstName
    lastName: $lastName
    phone: $phone
    email: $email
    password: $password
  ) {
    token
  }
}

`;

export default signupMutation;
