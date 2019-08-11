import gql from 'graphql-tag';

const getCompaniesQuery = gql`
{
  companies{
    name
    _id
    events{
      title
    }
  }
}
            `

export default getCompaniesQuery
