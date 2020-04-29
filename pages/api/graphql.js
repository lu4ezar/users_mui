/* eslint-disable no-console */
const { ApolloServer } = require("apollo-server");
const resolvers = require("../../server/resolvers");
const Users = require("../../server/datasource");
const schema = require("../../server/schema");
const User = require("../../server/model");

const typeDefs = schema;

require("../../server/db");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    users: new Users(User),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀Server ready at ${url}`);
});
