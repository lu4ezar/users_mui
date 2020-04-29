/* eslint-disable no-console */
const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const Users = require("./datasource");
const schema = require("./schema");
const User = require("./model");

const typeDefs = schema;

require("./db");

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
