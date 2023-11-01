const CONSTANTS = require("../constants/index");

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async Login(email) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }




  async FindById(userId) {
    const userWithoutPass = await this.userModel.findById(userId).select("-password");
    return userWithoutPass;
  }

  async AddUser(user) {
    const { role, userName, firstName, lastName, email, hashedPass } = user;

    const createUser = await this.userModel.create({
      role,
      userName,
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    const userWithoutPassword = createUser.toObject();
    delete userWithoutPassword.password;
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

  async getUsers(skip, limit, sort) {
    const users = await this.userModel
      .aggregate([{ $sort: { creationDate: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();
    return users;
  }

  async searchUsers(query, skip, limit, sort) {
    const queryOptions = {
      $or: [
        { email: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
    };

    const searchedUsers = await this.userModel
      .find(queryOptions)
      .sort({ creationDate: sort === "ASC" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    return searchedUsers;
  }

  async Delete(userId) {
    const user = await this.userModel.findByIdAndDelete(userId);
    return user;
  }
}


module.exports = { UserRepository };
