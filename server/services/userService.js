const CONSTANTS = require('../constants')
const config = require('./../config/keys');
const { HashPassword, VerifyPassword } = require('../utils/Hashing.js')
const jwt = require('jsonwebtoken')

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async Login(req) {
        const response = {}
        const { email, password } = req.body
        const user = await this.userRepo.Login(email)
        if (!user) {
            response.message = CONSTANTS.SERVER_USER_INVALID_CREDENTIALS
            response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS
            return response
        }
        if (!user.active) {
            response.message = CONSTANTS.USER_NOT_ACTIVE
            response.status = CONSTANTS.SERVER_IFORBIDDEN_HTTP_CODE
            return response
        }
        const passwordMatch = await VerifyPassword(password, user.password)
        if (!passwordMatch) {
            response.message = CONSTANTS.SERVER_USER_INVALID_CREDENTIALS
            response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS
            return response
        }
        // Update the lastLogin field with the current timestamp
        const currentTimestamp = Date.now();
        console.log(currentTimestamp);
        user.lastLogin = currentTimestamp;
        await user.save();

        const token = jwt.sign({ userid: user._id, username: user.name }, config.jwt.secret)
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        response.message = "Login success";
        response.user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            role: user.role,
            creationDate: user.creationDate,
            lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : null, // Format the timestamp
            lastUpdate: user.lastUpdate ? new Date(user.lastUpdate).toLocaleString() : null, // Format the timestamp
            active: user.active
        };
        response.access_token = token;
        response.token_type = "Bearer"
        return response
    }

    //async function findUserById
    async getUserById(userId) {
        try {
            const user = await this.userRepo.FindById(userId);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { UserService }