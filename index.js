const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*
 * Initialize MongoDB
 * Description: Connect Database to the system
 */
require("./DbConnection/dbCon")();

/*
 * Name: UserRoute
 * Path: /users
 * Description: Manage user details in application
 */
const UserRoute = require("./Routes/User.route");
app.use("/users", UserRoute);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
