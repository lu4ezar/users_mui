const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    users(skip: Int = 0, limit: Int = 10): [User]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }

  type User {
    _id: ID!
    email: String!
    name: String!
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

module.exports = typeDefs;
