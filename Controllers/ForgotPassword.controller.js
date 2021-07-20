const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/User.model");

module.exports = {
  sendLink: async (req, res, next) => {
    const email = req.body.email;
    const existingUser = await User.find({ email: email });
    if (existingUser.length == 0) {
      res.send("User not registered");
      return;
    }
    const secret = process.env.JWT_FORGOT_SECRET + existingUser[0].password;
    const payload = {
      email: existingUser[0].email,
      id: existingUser[0]._id,
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN_ONETIME,
    });
    const link = `${process.env.FRONTEND_URL}/forgot-password/reset-password/${existingUser[0]._id}/${token}`;
    console.log(link);
    res.send("Password reset link has been sent to your email");
  },

  resetPassword: async (req, res, next) => {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;
    const existingUser = await User.find({ _id: id });
    if (existingUser.length == 0) {
      res.send("Invalid user id");
      return;
    }
    const secret = process.env.JWT_FORGOT_SECRET + existingUser[0].password;
    try {
      const payload = jwt.verify(token, secret);
      const options = { new: true };
      const result = await User.findByIdAndUpdate(
        payload.id,
        { password: bcrypt.hashSync(password, 10) },
        options
      );
      res.status(200).json({
        message: "Password reset successful",
        result: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Fail",
        error: error.message,
      });
    }
  },
};
