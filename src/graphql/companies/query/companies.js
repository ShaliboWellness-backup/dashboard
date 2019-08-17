import gql from 'graphql-tag';

const getCompaniesQuery = gql`
{
  companies{
    name
    _id
    events{
      title
    }
    logo
    emailSuffix
  }
}
            `

export default getCompaniesQuery
