import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

// Create an http link:
const httpLink = new HttpLink({
  uri: "https://vesl-bot-prod.hasura.app/v1/graphql",
});

// Create a middleware link for headers:
const middlewareLink = new ApolloLink((operation, forward) => {
  // Add headers to the context:
  operation.setContext({
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': 'aiTGKjvGDfd8sD1GcmUzna6Sep00unKNsLGT6cZPVvpLJH7BlkZJQ2ShEIT91Jog'
    }
  });
  return forward(operation);
});

// Concatenate the middleware link and the http link, and pass it to the ApolloClient constructor:
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([middlewareLink, httpLink]),
});