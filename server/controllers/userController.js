const { UserService } = require("../services/userService");
const { UserRepository } = require("../repositories/userRepository");
const User = require("../models/User");
const CONSTANTS = require("../constants/index");

const userRepo = new UserRepository(User);
const userServ = new UserService(userRepo);

exports.addNewUser = async (req, res) => {
    try {
        const newUser = await userServ.AddUser(req);
        res.json(newUser);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};

//update user data
exports.updateUserData = async (req, res) => {
    try {
        const updatedUser = await userServ.UpdateUser(req);
        res.json(updatedUser);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userServ.getUserById(req);
        res.json(user);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};

//Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await userServ.getUsers(req);
        res.json(users);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};

// delete user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userServ.Delete(userId);
        res.json(result);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};
