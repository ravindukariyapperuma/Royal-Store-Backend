const mongoose = require("mongoose");
const config = require("../Configs/config");

module.exports = () => {
  mongoose
    .connect(config.db.uri, {
      dbName: config.db.name,
      user: config.db.user,
      pass: config.db.password,
      useNewUrlParser: config.db.useNewUrl,
      useUnifiedTopology: config.db.useUnifiedTopology,
      useFindAndModify: config.db.useFindAndModify,
    })
    .then(() => {
      console.log("🍂 Mongodb connected");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("🐁 Mongoose connected to db");
  });

  mongoose.connection.on("error", (err) => {
    console.log("❌ error - ", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("🔴 Mongoose connection is disconnected");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "⛔ Mongoose connection is disconnected due to app termination"
      );
      process.exit(0);
    });
  });
};
