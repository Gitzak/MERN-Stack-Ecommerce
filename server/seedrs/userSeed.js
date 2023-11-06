const config = require("../config/keys");
const mongoose = require("mongoose");
const { ROLES_USER } = require("../constants");
const bcrypt = require("bcrypt");

const User = require("../models/User");

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

        const hashedPassword = await hashPassword("12345678");

        const userData = {
            firstName: "admin",
            lastName: "admin",
            email: "admin@gmail.com",
            password: hashedPassword, //12345678
            role: ROLES_USER.Admin,
            userName: "admin",
            creationDate: Date.now(),
            active: true,
        };

        const user = new User(userData);
        await user.save();
        // console.log("User seeded successfully.");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding user:", error);
    }
};
// let count = 10;

const generateDynamicUserData = (count) => {
    const usersData = [];

    for (let i = 1; i <= count; i++) {
        const userData = {
            firstName: `User${i}`,
            lastName: `Last${i}`,
            email: `user${i}@example.com`,
            password: `password${i}`,
            role: ROLES_USER.Manager,
            userName: `user${i}`,
            creationDate: Date.now(),
            active: true,
        };

        usersData.push(userData);
    }

    return usersData;
};

const seedUsers = async (count) => {
    try {
        await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const hashedPassword = await hashPassword("12345678");

        const usersData = generateDynamicUserData(count);

        for (const userData of usersData) {
            const user = new User({
                ...userData,
                password: hashedPassword,
            });
            await user.save();
            // console.log(`User ${userData.userName} seeded successfully.`);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};

module.exports = {
    seedUser,
    seedUsers,
};
