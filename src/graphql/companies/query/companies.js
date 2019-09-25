import gql from 'graphql-tag';

const getCompaniesQuery = gql`
{
  companies{
    name
    _id
    codes
    masterCode
    events{
      title
    }
    users {
      _id
      firstName
      lastName
      email
    }
    logo
    emailSuffix
    isPublic
  }
}
            `

export default getCompaniesQuery
