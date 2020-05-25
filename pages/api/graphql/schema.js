import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    usersQuery(skip: Int = 0, limit: Int = 2): UsersQueryResult
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): ID!
  }

  type User {
    _id: ID!
    email: String!
    name: String!
  }

  type UsersQueryResult {
    users: [User!]
    hasNext: Boolean!
  }

  input CreateUserInput {
    email: String!
    name: String!
  }

  input UpdateUserInput {
    email: String
    name: String
  }
`;

export default typeDefs;
