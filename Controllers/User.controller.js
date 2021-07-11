const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../Models/User.model");

module.exports = {
  /*
   * method: GET
   * Description: Get a list of all users
   */
  getAllUsers: async (req, res, next) => {
    try {
      const results = await User.find();
      res.send(results);
    } catch (error) {
      res.send(error);
    }
  },

  /*
   * method: POST
   * Description: Create a new user
   */
  createNewUser: async (req, res, next) => {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    };
    try {
      const sameUsers = await User.find({ email: req.body.email });
      if (sameUsers.length != 0) {
        res.status(200).json({
          message: "ALREADYTAKEN",
        });
      } else {
        const user = new User(newUser);
        const result = await user.save();
        res.status(201).send(result);
      }
    } catch (error) {
      res.send(error);
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
        res.status(204).send("Empty Products");
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
