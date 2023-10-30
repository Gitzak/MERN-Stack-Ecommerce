const { UserService } = require("../services/userService");
const { UserRepository } = require("../repositories/userRepository");
const User = require("../models/User");

const userRepo = new UserRepository(User);

const userServ = new UserService(userRepo);

// login a user
exports.loginUser = async (req, res) => {
  try {
    const errors = req.validationErrors;
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
    const user = await userServ.Login(req);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login." });
    console.error("Error during login:", error);
  }
};
