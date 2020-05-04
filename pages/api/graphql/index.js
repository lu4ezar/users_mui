/* eslint-disable no-console */
import { ApolloServer } from "apollo-server-micro";
import resolvers from "./resolvers";
import UsersAPI from "./datasource";
import typeDefs from "./schema";
import User from "./model";
import db from "./db";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => db,
  dataSources: () => ({
    users: new UsersAPI(User),
  }),
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
