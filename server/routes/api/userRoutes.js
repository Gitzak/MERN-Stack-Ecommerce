const express = require("express");
const router = express.Router();
// controller functions
const { loginUser } = require("../../controllers/authController");
const { deleteUser } = require("../../controllers/authController");

// login route
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

module.exports = router;
