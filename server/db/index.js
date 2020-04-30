/* eslint-disable no-console */
import mongoose from "mongoose";
import config from "./config";

const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];
const { url, port, database } = environmentConfig;
const dbPath =
  process.env.PROD_MONGODB || `mongodb://${url}:${port}/${database}`;

mongoose
  .connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error(
      `mongoose connect error: ${err.message}, mongodb is unavailable`
    );
  });

const db = mongoose.connection;

db.once("open", () => {
  console.log(`db connected.`);
})
  .on("disconnected", () => {
    console.log("db disconnected");
  })
  .on("close", () => {
    console.log("db closed");
  });
process.on("SIGINT", () => {
  console.log("app terminated");
});

export default db;
