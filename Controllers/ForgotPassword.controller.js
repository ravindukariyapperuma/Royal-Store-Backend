const mongoose = require("mongoose");

const User = require("../Models/User.model");

const tokensHelper = require("../Helpers/tokens.helper");
const hashHelper = require("../Helpers/hash.helper");

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
    const token = await tokensHelper.generateToken(
      payload,
      secret,
      process.env.JWT_EXPIRES_IN_ONETIME
    );
    const link = `${process.env.FRONTEND_URL}/reset-password/${existingUser[0]._id}/${token}`;
    console.log(link);
    res.status(200).json({
      message: "Password reset link has been sent to your email",
    });
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
      const payload = await tokensHelper.verifyToken(token, secret);
      const options = { new: true };
      const result = await User.findByIdAndUpdate(
        payload.id,
        {
          password: await hashHelper.generateHash(
            password,
            Number(process.env.SALT_ROUNDS)
          ),
        },
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
