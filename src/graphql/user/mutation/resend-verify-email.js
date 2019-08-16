import gql from 'graphql-tag';

const resendVerifyEmail = gql`
  mutation {
    resendVerifyEmail
  }
`;

export default resendVerifyEmail;
