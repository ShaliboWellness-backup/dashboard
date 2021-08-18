import gql from 'graphql-tag';

const updateAvailableCodes = gql`
mutation UpdateAvailableCodes($companyId: String!, $count: Int!){
    updateAvailableCodes(companyId: $companyId, count: $count){
        codes
    }

}
`;

export default updateAvailableCodes;
