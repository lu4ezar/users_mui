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
  query Users($skip: Int = 0, $limit: Int = 5) {
    usersQuery(skip: $skip, limit: $limit) {
      users {
        _id
        name
        email
      }
      hasNext
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
