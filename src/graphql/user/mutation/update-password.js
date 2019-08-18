import gql from 'graphql-tag';

const updatePasswordMutation = gql`
mutation updatePassword(
  $oldPwd: String
  $forgotToken: String
  $newPwd: String!
) {
  updatePassword(oldPwd: $oldPwd, forgotToken: $forgotToken, newPwd: $newPwd){
    token
  }
}
`;

export default updatePasswordMutation;
