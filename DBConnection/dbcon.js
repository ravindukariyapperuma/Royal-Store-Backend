const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// console.log(dotenv.parsed);

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: process.env.USE_NEW_URL_PARSER,
      useUnifiedTopology: process.env.USE_UNIFIED_TOPOLOGY,
      useFindAndModify: process.env.USE_FIND_AND_MODIFY,
    })
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Mongoose connection is disconnected due to app termination");
      process.exit(0);
    });
  });
};
