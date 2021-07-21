const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (payload, secret, expire) => {
    const token = jwt.sign(payload, secret, {
      expiresIn: expire,
    });
    return token;
  },

  verifyToken: (token, secret) => {
    const payload = jwt.verify(token, secret);
    return payload;
  },
};
