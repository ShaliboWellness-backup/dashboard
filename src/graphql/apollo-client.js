import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// REACT_APP_GRAPHQL_URI is defined in .env file. When the app is deployed to
// heroku, the REACT_APP_GRAPHQL_URI env variable needs to be reset to point to
// https://YOUR-APP-NAME.herokuapp.com/graphql (this will have precedence over
// the default value provided in the .env file). See the .env file on how to do
// this.
const { NODE_ENV, REACT_APP_GRAPHQL_URI } = process.env;

const isNotProduction = NODE_ENV !== 'production';
const uri = isNotProduction ? 'http://localhost:3001/graphql' : REACT_APP_GRAPHQL_URI;

// Log
console.log('\nNODE_ENV', NODE_ENV, '\nGRAPHQL_URI', uri);

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('x-auth-token');

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-auth-token': token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
