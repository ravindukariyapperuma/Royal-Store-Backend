const jwt = require("jsonwebtoken");

module.exports = {
  adminOnly: async (req, res, next) => {
    try {
      const tokenUserType = await getUserType(req);
      if (tokenUserType != "admin") {
        throw new Error("Only admin permission to access");
      }
      next();
    } catch (error) {
      res.status(400).json({
        message: "Fail",
        error: error.message,
      });
    }
  },

  customerOnly: async (req, res, next) => {
    try {
      const tokenUserType = await getUserType(req);
      if (tokenUserType != "customer") {
        throw new Error("Only customer permission to access");
      }
      next();
    } catch (error) {
      res.status(400).json({
        message: "Fail",
        error: error.message,
      });
    }
  },
};

getUserType = (req) => {
  const token = req.headers.authorization;
  var decoded = jwt.decode(token.split(" ")[1], { complete: true });
  return decoded.payload.data.userType;
};
