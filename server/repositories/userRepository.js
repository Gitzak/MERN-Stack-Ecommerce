const CONSTANTS = require("../constants/index");

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async Login(email) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  
  async Findbyuser(userId) {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async Delete(userId) {
    const user = await this.userModel.findByIdAndDelete(userId);
    return user;
  }

  // GET USER BY ID
  async FindById(userId) {
    try {
      const user = await this.userModel.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async AddUser(user) {
    const { role, userName, firstName, lastName, email, password } = user;

    const createUser = await this.userModel.create({
      role,
      userName,
      firstName,
      lastName,
      email,
      password,
    });

    const userWithoutPassword = createUser.toObject();
    delete userWithoutPassword.password;
    console.log(userWithoutPassword);
    return userWithoutPassword;
  }

  async UpdateUser(id, user) {
    const filter = { _id: id };

    const updateData = {
      $set: user,
    };

    const result = await this.userModel.updateOne(filter, updateData);

    if (result.matchedCount === 1) {
      return {
        message: CONSTANTS.USER_UPDATED,
        status: CONSTANTS.SERVER_UPDATED_HTTP_CODE,
      };
    } else {
      return {
        message: CONSTANTS.USER_NOT_FOUND,
        status: CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE,
      };
    }
  }
}

module.exports = { UserRepository };
