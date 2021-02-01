import gql from 'graphql-tag';


const trainersQuery = gql`
  query {
    trainers {
    _id
      firstName
      lastName
      email
      phone
      roles
      verified
      company{
      _id
      name
      }
    }
  }
`;

export default trainersQuery;
