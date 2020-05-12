import ApolloClient, { gql } from "apollo-boost";

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
    : "http://localhost:3000/api/graphql";

const client = new ApolloClient({
  uri: ENDPOINT,
});

export default client;
