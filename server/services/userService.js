const CONSTANTS = require("../constants");
const config = require("./../config/keys");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");
const SendMailToUser = require("../utils/sendMail");
const { sign } = require("../utils/JWT.js");

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async Login(req) {
        try {
            const response = {};
            const { email, password } = req.body;
            const user = await this.userRepo.Login(email);
            if (!user) {
                response.message = CONSTANTS.INVALID_CREDENTIALS;
                response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS;
                return response;
            }
            if (!user.active) {
                response.message = CONSTANTS.USER_NOT_ACTIVE;
                response.status = CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE;
                return response;
            }
            const passwordMatch = await VerifyPassword(password, user.password);
            if (!passwordMatch) {
                response.message = CONSTANTS.INVALID_CREDENTIALS;
                response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS;
                return response;
            }
            // Update the lastLogin field with the current timestamp
            const currentTimestamp = Date.now();
            // console.log(currentTimestamp);
            user.lastLogin = currentTimestamp;
            await user.save();

            const token = sign(
                {
                    userId: user._id,
                    userName: user.userName,
                    userRole: user.role,
                    active: user.active,
                }
                // config.jwt.secret
            );

            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = "Login success";
            // todo: optimize the response data
            response.user = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                role: user.role,
                creationDate: user.creationDateFormatted,
                lastLogin: user.lastLoginFormatted,
                lastUpdate: user.lastUpdateFormatted,
                active: user.active,
            };
            response.token = token;
            response.token_type = "Bearer";
            return response;
        } catch (error) {
            // Handle the error, you can log the error or throw a custom error
            console.error("Error in Login:", error);
            throw error; // You can re-throw the error or return a custom error message
        }
    }

    async AddUser(req) {
        const response = {};

        const { role, userName, firstName, lastName, email, password, active } = req.body;

        // Check if a product with the same name or SKU already exists
        const existingUserByUserName = await this.userRepo.findUserByName(userName);
        const existingUserByEmail = await this.userRepo.findUserByEmail(email);

        if (existingUserByUserName) {
            response.message = "UserName already exists.";
            response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
            return response;
        }

        if (existingUserByEmail) {
            response.message = "Email already exists.";
            response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
            return response;
        }

        const hashedPass = await HashPassword(password);

        const newUser = {
            role,
            userName,
            firstName,
            lastName,
            email,
            hashedPass,
            password,
            active,
        };
        // console.log('newUser', newUser.active);
        // return
        const user = await this.userRepo.AddUser(newUser);

        if (!user) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        const sendedMail = await SendMailToUser({
            userEmail: newUser.email,
            userPassword: newUser.password,
        });

        response.message = CONSTANTS.USER_CREATED;
        response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;

        return response;
    }

    async UpdateUser(req) {
        const id = req.params.id;
        const response = {};

        const { role, userName, firstName, lastName, email, active } = req.body;

        const user = await this.userRepo.FindById(id);
        if (!user) {
            response.message = CONSTANTS.INVALID_USER_ID;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        const existingUserByUserName = await this.userRepo.findUserByNameExcludingId(userName, id);
        const existingUserByEmail = await this.userRepo.findUserByEmailExcludingId(email, id);

        if (existingUserByUserName) {
            response.message = "UserName already exists.";
            response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
            return response;
        }

        if (existingUserByEmail) {
            response.message = "Email already exists.";
            response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
            return response;
        }

        const currentTimestamp = Date.now();

        const updatedUser = {
            role,
            userName,
            firstName,
            lastName,
            email,
            active,
            lastUpdate: currentTimestamp,
        };

        const updateduser = await this.userRepo.UpdateUser(id, updatedUser);

        if (!updateduser) {
            response.message = CONSTANTS.USER_NOT_ACTIVE;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        response.message = CONSTANTS.USER_UPDATED;
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        return response;
    }

    async getUserById(req) {
        const userId = req.profile.userId;

        const response = {};
        try {
            const user = await this.userRepo.FindById(userId);
            if (!user) {
                response.message = CONSTANTS.INVALID_USER_ID;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            response.data = {
                ...user._doc,
                creationDate: user.creationDateFormatted,
                lastLogin: user.lastLoginFormatted,
                lastUpdate: user.lastUpdateFormatted,
            };
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            // console.log(user);

            return response;
        } catch (error) {
            // console.log(error);
            response.message = error.message;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async UpdateUser(req) {
        const id = req.params.id;
        const response = {};

        const { role, userName, firstName, lastName, email, active } = req.body;

        const user = await this.userRepo.FindById(id);
        if (!user) {
            response.message = CONSTANTS.INVALID_USER_ID;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        const existingUserByUserName = await this.userRepo.findUserByNameExcludingId(userName, id);
        const existingUserByEmail = await this.userRepo.findUserByEmailExcludingId(email, id);

        if (existingUserByUserName) {
            response.message = "UserName already exists.";
            response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
            return response;
        }

        if (existingUserByEmail) {
            response.message = "Email already exists.";
            response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
            return response;
        }

        const currentTimestamp = Date.now();

        const updatedUser = {
            role,
            userName,
            firstName,
            lastName,
            email,
            active,
            lastUpdate: currentTimestamp,
        };

        const updateduser = await this.userRepo.UpdateUser(id, updatedUser);

        if (!updateduser) {
            response.message = CONSTANTS.USER_NOT_ACTIVE;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        response.message = CONSTANTS.USER_UPDATED;
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        return response;
    }

    async updatePassword(req) {
        const id = req.profile.userId;
        const response = {};

        const { password } = req.body;

        const user = await this.userRepo.FindById(id);
        if (!user) {
            response.message = CONSTANTS.INVALID_USER_ID;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        const currentTimestamp = Date.now();

        const hashedPass = await HashPassword(password);

        const updatedUser = {
            password: hashedPass,
            lastUpdate: currentTimestamp,
        };

        const userU = await this.userRepo.UpdateUser(id, updatedUser);

        if (!userU) {
            response.message = CONSTANTS.USER_NOT_ACTIVE;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        response.message = CONSTANTS.USER_UPDATED_PASSWORD;
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        return response;
    }

    async getUsers(req) {
        const query = req.query.query;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || "ASC";
        // console.log("page ", page);
        // console.log("sort", sort);
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        const response = {};
        const userId = req.profile.userId;

        if (query) {
            try {
                const searchUsers = await this.userRepo.searchUsers(query, sort);
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                response.data = searchUsers;
                return response;
            } catch (error) {
                return error;
            }
        } else {
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            const users = await this.userRepo.getUsers( userId);
            response.data = users;
            return response;
        }
    }

    async searchUsers(req) {
        const query = req.query.query;
        try {
            const searchedUsers = await this.userRepo.searchUsers(query);

            return searchedUsers;
        } catch (error) {
            return error;
        }
    }

    async Delete(req) {
        const userId = req.params.id;
        const response = {};
        try {
            const user = await this.userRepo.FindById(userId);

            if (!user) {
                response.message = CONSTANTS.INVALID_USER_ID;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            const deletedUser = await this.userRepo.Delete(userId);
            if (!deletedUser) {
                response.message = CONSTANTS.ALREADY_USER_DELETED;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = CONSTANTS.USER_DELETED;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            console.error(error);
            return response;
        }
    }
}

module.exports = { UserService };
