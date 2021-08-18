import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { buildClientSchema } from 'graphql/utilities/buildClientSchema';
import { addResolveFunctionsToSchema } from 'graphql-tools';
import resolvers from './mocks';

/**
 * @see {@link https://www.robinwieruch.de/graphql-server-mock-apollo-client/}
 * @see {@link https://www.apollographql.com/docs/graphql-tools/mocking.html}
 */

// Read schema from file
const schema = buildClientSchema(require('./schema.json'));

// Add mocked resolvers
addResolveFunctionsToSchema({ schema, resolvers });

const mockClient = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
});

export default mockClient;
