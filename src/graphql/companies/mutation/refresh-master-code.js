import gql from "graphql-tag";


const refreshMasterCodeMutation = gql`
mutation RefreshMasterCode($_id: String!) {
    refreshMasterCode(_id: $_id)
}

`

export default refreshMasterCodeMutation

