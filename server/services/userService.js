const CONSTANTS = require("../constants");
const config = require("./../config/keys");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async Login(req) {
    const response = {};
    const { email, password } = req.body;
    const user = await this.userRepo.Login(email);
    if (!user) {
      response.message = CONSTANTS.SERVER_USER_INVALID_CREDENTIALS;
      response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS;
      return response;
    }
    if (!user.active) {
      response.message = CONSTANTS.USER_NOT_ACTIVE;
      response.status = CONSTANTS.SERVER_IFORBIDDEN_HTTP_CODE;
      return response;
    }
    const passwordMatch = await VerifyPassword(password, user.password);
    if (!passwordMatch) {
      response.message = CONSTANTS.SERVER_USER_INVALID_CREDENTIALS;
      response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS;
      return response;
    }
    // Update the lastLogin field with the current timestamp
    const currentTimestamp = Date.now();
    console.log(currentTimestamp);
    user.lastLogin = currentTimestamp;
    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        userRole: user.role,
        active: user.active,
      },
      config.jwt.secret
    );

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
      lastLogin: user.lastLogin
        ? new Date(user.lastLogin).toLocaleString()
        : null, // Format the timestamp
      lastUpdate: user.lastUpdate
        ? new Date(user.lastUpdate).toLocaleString()
        : null, // Format the timestamp
      active: user.active,
    };
    response.token = token;
    response.token_type = "Bearer";
    return response;
  }

  async Delete(userId) {
    const response = {};

    try {
      const user = await this.userRepo.Findbyuser(userId);

      if (!user) {
        response.message = CONSTANTS.USER_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }

      await this.userRepo.Delete(userId);

      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      response.message = CONSTANTS.USER_DELETED;
    } catch (error) {
      response.message = "An error occurred while deleting the user.";
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      console.error(error);
    }
    return response;
  }

  async AddUser(req) {
    const response = {};

    const { role, userName, firstName, lastName, email, password } = req.body;

    if (!role || !userName || !firstName || !lastName || !email || !password) {
      response.message = CONSTANTS.FIELD_EMPTY;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      return response;
    }

    const newUser = {
      role,
      userName,
      firstName,
      lastName,
      email,
      password: await HashPassword(password),
    };

    const user = await this.userRepo.AddUser(newUser);

    if (!user) {
      response.message = CONSTANTS.SERVER_ERROR_MESSAGE;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.USER_CREATED;
    response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
    response.data = user;
    return response;
  }

  async UpdateUser(req) {
    const id = req.params.id;

    const response = {};

    const { role, userName, firstName, lastName, email, password } = req.body;

    const updatedUser = {
      role,
      userName,
      firstName,
      lastName,
      email,
      password: await HashPassword(password),
    };

    const updateduser = await this.userRepo.UpdateUser(id, updatedUser);

    response.message = updateduser;

    return response;
  }
}

module.exports = { UserService };
