import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import GraphQLClient from '@accounts/graphql-client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    request: async (operation) => {
        const tokens = await accountsClient.getTokens();
        if (tokens) {
            operation.setContext({
                headers: {
                    'accounts-access-token': tokens.accessToken,
                },
            });
        }
    },
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
    onError: (e) => { console.log(e); },
});

const accountsGraphQL = new GraphQLClient({ graphQLClient: client });
const accountsClient = new AccountsClient({}, accountsGraphQL);
const accountsPassword = new AccountsClientPassword(accountsClient);

export { accountsClient, accountsGraphQL, accountsPassword };
export default client;
