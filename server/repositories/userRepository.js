class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async Login(email) {
        const user = await this.userModel.findOne({ email: email })
        return user
    }
}

module.exports = { UserRepository };