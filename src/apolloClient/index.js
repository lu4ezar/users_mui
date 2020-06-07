/* eslint-disable no-console */
import ApolloClient from "apollo-boost";

export const ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/graphql"
    : `https://${process.env.VERCEL_URL}/api/graphql`;

const client = new ApolloClient({
  uri: ENDPOINT,
});

export default client;
