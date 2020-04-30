/* eslint-disable no-console */
import { ApolloServer } from "apollo-server-micro";
import resolvers from "../../server/resolvers";
import UsersAPI from "../../server/datasource";
import typeDefs from "../../server/schema";
import User from "../../server/model";
import db from "../../server/db";

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
