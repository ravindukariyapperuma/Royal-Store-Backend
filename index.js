const express = require("express");
const dotenv = require("dotenv").config();

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
require('./Helpers/reports.helper')();

/*
 * Name: UserRoute
 * Path: /users
 * Description: Manage user details in application
 */
const UserRoute = require("./Routes/User.route");
app.use("/users", UserRoute);

const ForgotPasswordRoute = require("./Routes/ForgotPassword.route");
app.use("/forgot-password", ForgotPasswordRoute);

app.listen(process.env.PORT, () => {
  console.log("🚀 Server started on port " + process.env.PORT);
});