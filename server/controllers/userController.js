const { UserService } = require("../services/userService");
const { UserRepository } = require("../repositories/userRepository");
const User = require("../models/User");

const userRepo = new UserRepository(User);
const userServ = new UserService(userRepo);

exports.addNewUser = async (req, res) => {
    try {
        const newUser = await userServ.AddUser(req);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//update user data
exports.updateUserData = async (req, res) => {
    try {
        const updatedUser = await userServ.UpdateUser(req);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userServ.getUserById(req);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await userServ.getUsers(req);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// delete user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userServ.Delete(userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
