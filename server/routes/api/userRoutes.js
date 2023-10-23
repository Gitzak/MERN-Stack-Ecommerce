const express = require("express");
const router = express.Router();
// controller functions
const { loginUser } = require("../../controllers/authController");
const { isAllowed } = require("../../middleware/isAllowed");
const {
  addNewUser,
  deleteUser,
  getUserById,
  updateUserData,
} = require("../../controllers/userController");

// middleware functions
const checkUserRole = require("../../middleware/checkUserRole");

// login route
router.post("/login", loginUser);
//Add new user route
router.post("/", isAllowed, addNewUser);
// Route to get a user by ID
router.get("/:id", getUserById);
//Update user's data
router.put("/:id", isAllowed, updateUserData);
// Route for deleting a user
router.delete("/:id", deleteUser);

module.exports = router;
