const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require("cors");

const apiURL = `/api/v1`;

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./Helpers/reports.helper")();

/*
 * Name: UserRoute
 * Path: /users
 * Description: Manage user details in application
 */
const UserRoute = require("./Routes/User.route");
app.use(`${apiURL}/users`, UserRoute);

const ForgotPasswordRoute = require("./Routes/ForgotPassword.route");
app.use(`${apiURL}/forgot-password`, ForgotPasswordRoute);

module.exports = app;
