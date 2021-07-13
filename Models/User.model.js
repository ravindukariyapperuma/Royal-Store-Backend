const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: String,
    required: [true, "A user must have a user id"],
  },
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  phone: {
    type: String,
    required: [true, "A user must have phone"],
  },
  userType: {
    type: String,
    enum: {
      values: ["customer", "admin"],
      message: "User type should be customer or admin",
    },
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
