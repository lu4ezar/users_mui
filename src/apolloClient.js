/* eslint-disable no-console */
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import gql from "graphql-tag";

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      _id
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!) {
    createUser(input: { email: $email, name: $name }) {
      _id
      email
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      _id
      email
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://users-mui.now.sh/api/graphql"
    : "http://localhost:3000/api/graphql";

const cache =
  typeof window === "undefined"
    ? new InMemoryCache()
    : new InMemoryCache().restore(window.__APOLLO_STATE__);

const client = new ApolloClient({
  ssrMode: true,
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
  cache,
});

export default client;
