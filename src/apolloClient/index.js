/* eslint-disable no-console */
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

export const ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/graphql"
    : `https://${process.env.VERCEL_URL}/api/graphql`;

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: ENDPOINT,
      credentials: "same-origin",
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
