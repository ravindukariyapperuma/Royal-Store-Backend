const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/User.controller");

/*
 * method: GET
 * Description: Get a list of all users
 */
router.get("/", UserController.getAllUsers);

/*
 * method: POST
 * Description: Create a new user
 */
router.post("/", UserController.createNewUser);

/*
 * method: GET
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
