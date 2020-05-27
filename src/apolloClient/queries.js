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
