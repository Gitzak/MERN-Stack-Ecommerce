const express = require("express");
const router = express.Router();
const { loginUser } = require("../../controllers/authController");
const { isAdmin } = require("../../middleware/isAdmin");
const { validateUserLogin, validateUserForm, validateUserFormUpdate } = require("../../middleware/ValidateFormMiddleweare");
const { handleValidationErrors } = require("../../middleware/handleValidationErrors");
const { isAdminManager } = require("../../middleware/isAdminManager");
const { validateIdFormat } = require("../../middleware/validateIdFormat");
const checkUserRole = require("../../middleware/checkUserRole");

const { addNewUser, deleteUser, getUserById, getUsers, searchUsers, updateUserData, getUserProfile, updatePassword } = require("../../controllers/userController");

// login route
router.post("/login", validateUserLogin, handleValidationErrors, loginUser);
router.get("/profile", isAdminManager, (req, res) => {
    res.status(200).json({
        data: req.profile,
    });
});
// get user profile
router.get("/profileData", isAdminManager, getUserProfile);
// update user password
router.put("/updatePassword", isAdminManager, updatePassword);
//Add new user route
router.post("/", isAdmin, validateUserForm, handleValidationErrors, addNewUser);
//Route for getting all users
router.get("/", isAdminManager, getUsers);
// Route to get a user by ID
router.get("/:id", isAdminManager, validateIdFormat, getUserById);
//Update user's data
router.put("/:id", isAdmin,  updateUserData);
// router.put("/:id", isAdmin, validateIdFormat, validateUserFormUpdate, handleValidationErrors, updateUserData);
// Route for deleting a user
router.delete("/:id", isAdmin, validateIdFormat, deleteUser);

module.exports = router;
