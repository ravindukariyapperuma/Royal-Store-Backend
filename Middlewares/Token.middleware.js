const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: async (user) => {
    return jwt.sign({ data: user }, "secretkey", { expiresIn: "24h" });
  },

  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({ error: "please provide a token" });
    else {
      jwt.verify(token.split(" ")[1], "secretkey", (err, value) => {
        if (err)
          res.status(500).json({ error: "failed to authenticate token" });
        req.user = value.data;
        next();
      });
    }
  },
};
