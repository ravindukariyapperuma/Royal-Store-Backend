const express = require("express");

const app = express();
const cors = require("cors");

//Initialize DB
require("./DbConnection/dbCon")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
