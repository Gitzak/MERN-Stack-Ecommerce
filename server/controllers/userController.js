const { UserService } = require("../services/userService");
const { UserRepository } = require("../repositories/userRepository");
const User = require("../models/User");

const userRepo = new UserRepository(User);
const userServ = new UserService(userRepo);

const addNewUser = async (req, res) => {
  const newUser = await userServ.AddUser(req);
  // console.log('new user', newUser)
  res.json(newUser);
};

//update user data
const updateUserData = async (req, res) => {
  const updatedUser = await userServ.UpdateUser(req);
  console.log(updatedUser);
  res.json(updatedUser);
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userServ.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ status: 200, data: [user] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete user 
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  const result = await userServ.Delete(userId);
  res.json(result);
};

module.exports = { getUserById, addNewUser, updateUserData, deleteUser };
