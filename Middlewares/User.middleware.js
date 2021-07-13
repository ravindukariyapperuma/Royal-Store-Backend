var validator = require("email-validator");

const User = require("../Models/User.model");

module.exports = {
  validate: async (req, res, next) => {
    try {
      if (req.body.name == undefined || req.body.name == "") {
        throw new Error("Please enter your name");
      }

      if (req.body.email == undefined || req.body.email == "") {
        throw new Error("Please enter your email");
      } else {
        if (!validator.validate(req.body.email)) {
          throw new Error("Please enter a valid email address");
        }
      }

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

      if (req.body.phone == undefined || req.body.phone == "") {
        throw new Error("Please enter your phone number");
      }

      if (req.body.userType == undefined || req.body.userType == "") {
        throw new Error("Please enter your user type");
      } else {
        if (req.body.userType != "admin" && req.body.userType != "customer") {
          throw new Error("User type should be customer or admin");
        }
      }

      const sameUsers = await User.find({ email: req.body.email });
      if (sameUsers.length != 0) {
        throw new Error("Email already registered");
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
