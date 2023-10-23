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
}

module.exports = { UserRepository };
