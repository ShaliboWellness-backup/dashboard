import gql from 'graphql-tag';

const getCompaniesQuery = gql`
{
  companies{
    name
    _id
    events{
      title
    }
    users {
      _id
      name
      email
    }
    logo
    emailSuffix
  }
}
            `

export default getCompaniesQuery
