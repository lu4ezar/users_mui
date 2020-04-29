import ApolloClient, { gql } from "apollo-boost";
import fetch from "isomorphic-unfetch";

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

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
      email
      name
    }
  }
`;

export const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://users-mui.now.sh/api/graphql"
    : "http://192.168.0.125:4000";

const client = new ApolloClient({
  uri: ENDPOINT,
  cors: {
    origin: "*",
  },
  fetch,
});

export default client;
