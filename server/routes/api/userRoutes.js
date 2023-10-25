const express = require("express");
const router = express.Router();
// controller functions
const { loginUser } = require("../../controllers/authController");
const { isAdmin } = require("../../middleware/isAdmin");
const {
  addNewUser,
  deleteUser,
  getUserById,
  getUsers,
  searchUsers,
  updateUserData,
} = require("../../controllers/userController");

// middleware functions
const checkUserRole = require("../../middleware/checkUserRole");

// login route
router.post("/login", loginUser);
//Add new user route
router.post("/",isAdmin, addNewUser);
//Route for searching users
router.get('/search', searchUsers)
// Route to get a user by ID
router.get("/:id",isAdmin, getUserById);
//Update user's data
router.put("/:id", isAdmin, updateUserData);
//Route for getting all users
router.get('/', getUsers)
// Route for deleting a user
router.delete("/:id",isAdmin, deleteUser);

module.exports = router;
