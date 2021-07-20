const jwt = require("jsonwebtoken");

module.exports = {
  generateAuthToken: async (user) => {
    return jwt.sign({ data: user }, process.env.JWT_AUTH_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
};
