const jwt = require("jsonwebtoken");

module.exports = {
  verifyAuthToken: async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({ error: "please provide a token" });
    else {
      jwt.verify(token.split(" ")[1], process.env.JWT_AUTH_SECRET, (err, value) => {
        if (err)
          res.status(500).json({ error: "failed to authenticate token" });
        req.user = value.data;
        next();
      });
    }
  },
};
