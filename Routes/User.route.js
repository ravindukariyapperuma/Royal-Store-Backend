const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/User.controller");

const UserMiddleware = require("../Middlewares/User.middleware");
const TokenMiddleware = require("../Middlewares/Token.middleware");
const PermissionMiddleware = require("../Middlewares/Permission.middleware");

/**
 * @api {get} /users/
 * @apiName Get all users
 * @apiPermission Admin
 * @apiGroup User
 *
 * @apiSuccess (200)
 */
router.get(
  "/",
  TokenMiddleware.verifyAuthToken,
  PermissionMiddleware.adminOnly,
  UserController.getAllUsers
);

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
router.post("/", UserMiddleware.validate, UserController.createNewUser);

/*
 * method: GET
 * route parameter: id
 * Description: Get a user by id
 */
router.get("/:id", UserController.findUserById);

/*
 * method: PATCH
 * Description: Update a user by id
 */
router.patch("/:id", UserController.updateAUser);

/*
 * method: DELETE
 * Description: Delete a user by id
 */
router.delete("/:id", UserController.deleteAUser);

module.exports = router;
