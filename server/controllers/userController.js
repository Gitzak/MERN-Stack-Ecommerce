const { UserService } = require('../services/userService');
const { UserRepository } = require('../repositories/userRepository')
const User = require('../models/User');

const userRepo = new UserRepository(User);
const userServ = new UserService(userRepo);

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        // const requestingUserRole = req.user.role;
        const user = await userServ.getUserById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found'});
        }

        return res.status(200).json({ status: 200, data: [user]});
        // if (requestingUserRole === 'admin' || requestingUserRole === 'manager') {
        // } else {
        //     return res.status(403).json({ status: 403, message: "You don't have enough privilege"});
        // }
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
};

module.exports = { getUserById };