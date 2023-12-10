require('dotenv').config();
const config = require("../config/keys");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ROLES_USER } = require("../constants");

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw error;
    }
}

async function clearCollections() {
    try {
        await mongoose.connection.db.dropDatabase();
        console.log('All collections cleared.');
    } catch (error) {
        console.error('Error clearing collections:', error);
    }
}

async function setupApp() {
    try {
        await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await clearCollections();

        const User = require("../models/User");
        const Customer = require("../models/Customer");

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
        console.log("Admin created successfully : Done!");

        const managerData = {
            firstName: "manager",
            lastName: "manager",
            email: "manager@gmail.com",
            password: hashedPassword, //12345678
            role: ROLES_USER.Manager,
            userName: "manager",
            creationDate: Date.now(),
            active: true,
        };

        const manager = new User(managerData);
        await manager.save();
        console.log("Manager created successfully : Done!");

        const customerData = {
            firstName: "customer",
            lastName: "customer",
            email: "customer@gmail.com",
            password: hashedPassword, //12345678
            creationDate: Date.now(),
            phoneNumber: '+212666666666',
            validatAccount: true,
            active: true,
        };

        const customer = new Customer(customerData);
        await customer.save();

        console.log("Customer created successfully : Done!");

        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }
}

setupApp();
