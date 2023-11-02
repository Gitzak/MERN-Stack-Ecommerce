const express = require("express");
const router = express.Router();
const { loginUser } = require("../../controllers/authController");
const { isAdmin } = require("../../middleware/isAdmin");
const { validateUserLogin, validateUserForm, validateUserFormUpdate } = require("../../middleware/ValidateFormMiddleweare");
const { handleValidationErrors } = require("../../middleware/handleValidationErrors");
const { isAdminManager } = require("../../middleware/isAdminManager");
const checkUserRole = require("../../middleware/checkUserRole");

const { addNewUser, deleteUser, getUserById, getUsers, searchUsers, updateUserData } = require("../../controllers/userController");

// login route
router.post("/login", validateUserLogin, handleValidationErrors, loginUser);
//Add new user route
router.post("/", isAdmin, validateUserForm, handleValidationErrors, addNewUser);
//Route for getting all users
router.get("/", isAdminManager, getUsers);
// Route to get a user by ID
router.get("/:id", isAdminManager, getUserById);
//Update user's data
router.put("/:id", isAdmin, validateUserFormUpdate, handleValidationErrors, updateUserData);
// Route for deleting a user
router.delete("/:id", isAdmin, deleteUser);

module.exports = router;
