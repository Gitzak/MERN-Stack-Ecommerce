const { UserService } = require("../services/userService");
const { UserRepository } = require("../repositories/userRepository");
const User = require("../models/User");

const userRepo = new UserRepository(User);

const userServ = new UserService(userRepo);

// login a user
const loginUser = async (req, res) => {
  const user = await userServ.Login(req);
  res.json(user);
};
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  // console.log(userId);
  const result = await userServ.Delete(userId);
  res.json(result);
};

module.exports = { loginUser, deleteUser };
