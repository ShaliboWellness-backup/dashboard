import gql from "graphql-tag";

const updateCompanyMutation = gql`
  mutation updateCompany(
    $_id: String!
    $name: String
    $logo: String
    $isPublic: Boolean
    $emailSuffix: String
    $eventsIds: [String!]
    $usersIds: [String!]
    $promotionsIds: [String!]
    $leaderboardAvailable: Boolean
  ) {
    updateCompany(
      _id: $_id
      name: $name
      logo: $logo
      isPublic: $isPublic
      emailSuffix: $emailSuffix
      eventsIds: $eventsIds
      usersIds: $usersIds
      promotionsIds: $promotionsIds
      leaderboardAvailable: $leaderboardAvailable
    ) {
      _id
      name
      emailSuffix
      logo
      isPublic
      leaderboardAvailable
      events {
        _id
        title
      }
      promotions {
        _id
        title
      }
      users {
        _id
        firstName
        lastName
      }
    }
  }
`;

export default updateCompanyMutation;
