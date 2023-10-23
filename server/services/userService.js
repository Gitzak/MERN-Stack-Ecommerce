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
            response.message = CONSTANTS.USER_NOT_FOUND
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE
            return response
        }
        const passwordMatch = await VerifyPassword(password, user.password)
        if (!passwordMatch) {
            response.message = CONSTANTS.PASSWORD_NOT_FOUND
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE
            return response
        }
        const token = jwt.sign({ userid: user._id, username: user.name }, config.jwt.secret)
        response.message = CONSTANTS.USER_LOGIN_OK
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE
        response.data = { id: user._id, username: user.name }
        response.token = token
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