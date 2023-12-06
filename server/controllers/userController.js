const { UserService } = require("../services/userService");
const { UserRepository } = require("../repositories/userRepository");
const User = require("../models/User");
const CONSTANTS = require("../constants/index");

const userRepo = new UserRepository(User);
const userServ = new UserService(userRepo);

exports.addNewUser = async (req, res) => {
    try {
        const newUser = await userServ.AddUser(req);
        res.status(newUser.status).json(newUser);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

//update user data
exports.updateUserData = async (req, res) => {
    try {
        const updatedUser = await userServ.UpdateUser(req);
        res.status(updatedUser.status).json(updatedUser);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userServ.getUserById(req);
        res.status(user.status).json(user);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await userServ.getUserById(req);
        res.status(user.status).json(user);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const user = await userServ.updatePassword(req);
        res.status(user.status).json(user);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

//Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await userServ.getUsers(req);
        res.status(users.status).json(users);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// delete user
exports.deleteUser = async (req, res) => {
    try {
        const result = await userServ.Delete(req);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};
