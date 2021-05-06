import gql from 'graphql-tag';

const getCompanyTeams = gql`
{
  teams {
    _id
    name
    users {
    _id
      firstName
      lastName
      email
      steps
    }
  }
}
`

export default getCompanyTeams
