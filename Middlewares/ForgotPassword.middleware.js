module.exports = {
  validate: async (req, res, next) => {
    try {
      if (req.body.password == undefined || req.body.password == "") {
        throw new Error("Please enter your password");
      } else {
        if (req.body.password.length < 4) {
          throw new Error(
            "Please make sure the password contians at least 4 characters"
          );
        }
      }

      if (
        req.body.confirmPassword == undefined ||
        req.body.confirmPassword == ""
      ) {
        throw new Error("Please enter your password again to confirm");
      } else {
        if (req.body.confirmPassword.length < 4) {
          throw new Error(
            "Please make sure the confirm password contians at least 4 characters"
          );
        }
      }

      if (req.body.password !== "" || req.body.confirmPassword !== "") {
        if (req.body.password !== req.body.confirmPassword) {
          throw new Error(
            "Please make sure the passwords you entered are matching"
          );
        }
      }
      next();
    } catch (error) {
      res.status(400).json({
        message: "Fail",
        error: error.message,
      });
      return;
    }
  },
};
