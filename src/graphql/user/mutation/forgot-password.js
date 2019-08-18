import gql from 'graphql-tag';

const forgotPasswordMutation = gql`
mutation ForgotPassword($email: String!){
  forgotPassword(email: $email)
}
`;

export default forgotPasswordMutation;
