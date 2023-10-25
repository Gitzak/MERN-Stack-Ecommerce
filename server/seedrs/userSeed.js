const config = require('../config/keys');
const mongoose = require('mongoose');
const { ROLES_USER } = require('../constants');
const bcrypt = require('bcrypt');

const User = require('../models/User');

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw error;
    }
}

const seedUser = async () => {
    try {
        await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const hashedPassword = await hashPassword('12345678');

        const userData = {
            firstName: 'admin',
            lastName: 'admin',
            email: 'admin@gmail.com',
            password: hashedPassword, //12345678
            role: ROLES_USER.Admin,
            userName: 'admin',
            creationDate: Date.now(),
            active: true,
        };

        const user = new User(userData);
        await user.save();
        console.log('User seeded successfully.');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding user:', error);
    }
};

module.exports = { seedUser };
