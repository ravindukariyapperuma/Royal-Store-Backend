const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../Models/User.model");

module.exports = {
  /**
   * @api {get} /users/
   * @apiName Get all users
   * @apiPermission Admin
   * @apiGroup User
   *
   * @apiSuccess (200)
   */
  getAllUsers: async (req, res, next) => {
    try {
      const results = await User.find();
      res.status(200).json({
        message: "Success",
        data: results,
      });
    } catch (error) {
      res.status(400).json({
        message: "Fail",
        error: error.message,
      });
    }
  },

  /**
   * @api {post} /users/
   * @apiName Create new user
   * @apiPermission All
   * @apiGroup User
   *
   * @apiParam  {String} [name] username
   * @apiParam  {String} [email] Email
   * @apiParam  {String} [password] Password
   * @apiParam  {String} [confirmPassword] Confirm Password
   * @apiParam  {String} [phone] Phone number
   * @apiParam  {String} [userType] User Type
   *
   * @apiSuccess (201) {Object} mixed `User` object
   */
  createNewUser: async (req, res, next) => {
    const newUser = {
      userId: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      userType: req.body.userType,
    };
    try {
      const user = new User(newUser);
      const result = await user.save();
      res.status(201).json({
        message: "Success",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        message: "Fail",
        error: error.message,
      });
    }
  },

  /*
   * method: GET
   * Description: Get a user by id
   */
  findUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        res.status(204).send("Empty user");
      } else {
        res.status(200).send(user);
      }
    } catch (error) {
      res.send(error);
    }
  },

  /*
   * method: PATCH
   * Description: Update a user by id
   */
  updateAUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      };
      const options = { new: true };
      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) {
        res.status(204).send("User does not exist");
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      res.send(error);
    }
  },

  /*
   * method: DELETE
   * Description: Delete a user by id
   */
  deleteAUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        res.status(204).send("User does not exist");
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      res.send(error);
    }
  },
};
