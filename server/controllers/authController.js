const { UserService } = require('../services/userService')
const { UserRepository } = require('../repositories/userRepository')
const User = require('../models/User')

const userRepo = new UserRepository(User)

const userServ = new UserService(userRepo)

// login a user
const loginUser = async (req, res) => {
    const user = await userServ.Login(req)
    res.json(user)
}

const addNewUser = async (req, res) => {
    const newUser = await userServ.AddUser(req)
    // console.log('new user', newUser)
    res.json(newUser)
}

const updateUserData = async(req, res) => {
    const updatedUser = await userServ.UpdateUser(req)
    console.log(updatedUser)
    res.json(updatedUser)

}
 

module.exports = { loginUser, addNewUser, updateUserData }