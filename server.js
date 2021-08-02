const mongoose = require("mongoose");
const app = require("./app");

const config = require("./Configs/config");

require("./DbConnection/dbCon")();

app.listen(config.app.port, () => {
  console.log("🚀 Server started on PORT " + config.app.port);
});
