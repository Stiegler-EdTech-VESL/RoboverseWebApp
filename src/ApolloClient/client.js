import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

// Create an http link:
const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URI,
});

// Create a middleware link for headers:
const middlewareLink = new ApolloLink((operation, forward) => {
  // Add headers to the context:
  operation.setContext({
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    }
  });
  return forward(operation);
});

// Concatenate the middleware link and the http link, and pass it to the ApolloClient constructor:
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([middlewareLink, httpLink]),
});