const express = require("express");
const router = express.Router();
// controller functions
const { loginUser } = require("../../controllers/authController");
const { deleteUser } = require("../../controllers/authController");
const { getUserById } = require("../../controllers/userController");

// middleware functions
const checkUserRole = require("../../middleware/checkUserRole");

// login route
router.post("/login", loginUser);
// Route to get a user by ID
router.get("/:id", getUserById);
// Route for deleting a user
router.delete("/:id", deleteUser);

module.exports = router;
