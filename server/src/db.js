/* eslint-disable no-console */
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error(
      `mongoose connect error: ${err.message}, mongodb is unavailable`
    );
  });

const db = mongoose.connection;

exports.db = db;

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
