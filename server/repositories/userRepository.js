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

  
  async FindById(userId) {
    try {
      const userWithoutPass = await this.userModel.findById(userId).select("-password");
      return userWithoutPass;
    } catch (error) {
      throw error;
    }
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
  
  async getUsers(skip, limit, sort) {
    const users = await this.userModel
    .aggregate([{ $sort: { creationDate: -1 } }])
    .skip(skip)
    .limit(limit)
    .exec();
    console.log(users.length);
    return users;
  }


  async searchUsers(query) {
    
    console.log(query)
    const searchedUsers = await this.userModel.find({
      $or: [
        { email: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { userName: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } }
      ]
    });


    return searchedUsers
  }
  
  // GET USER BY ID
  async Delete(userId) {
    const user = await this.userModel.findByIdAndDelete(userId);
    return user;
  }
}


module.exports = { UserRepository };
