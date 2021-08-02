require("dotenv").config();

const env = process.env.NODE_ENV;

const development = require("./Enviroments/development.config");
const test = require("./Enviroments/test.config");
const production = require("./Enviroments/production.config");

const config = {
  development,
  test,
  production,
};

module.exports = config[env];
