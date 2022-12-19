import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost/gatsby/graphql',
});

const authLink = setContext((_, { headers }) => {

    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('auth');
    const getAuthToken = token ? JSON.parse(token) : '';
    // return the headers to the context so httpLink can read them
    
    return {
        
        headers: {
            ...headers,
            authorization: getAuthToken ? `Bearer ${getAuthToken.authToken}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
export default client;