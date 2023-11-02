const config = require("../config/keys");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Customer = require("../models/customer");

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw error;
    }
}

const seedCustomer = async () => {
    try {
        await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const hashedPassword = await hashPassword("12345678");

        const customerData = {
            firstName: "customer",
            lastName: "customer",
            email: "customer@gmail.com",
            password: hashedPassword, //12345678
            creationDate: Date.now(),
            validatAccount: true,
            active: true,
        };

        const customer = new Customer(customerData);
        await customer.save();
        // console.log("Customer seeded successfully.");

        // mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding customer:", error);
    }
};
// let count = 10;

const generateDynamicCustomerData = (count) => {
    const customersData = [];

    for (let i = 1; i <= count; i++) {
        const customerData = {
            firstName: `Customer${i}`,
            lastName: `Last${i}`,
            email: `customer${i}@example.com`,
            password: `password${i}`,
            creationDate: Date.now(),
            validatAccount: true,
            active: true,
        };

        customersData.push(customerData);
    }

    return customersData;
};

const seedCustomers = async (count) => {
    try {
        await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const hashedPassword = await hashPassword("12345678");

        const customersData = generateDynamicCustomerData(count);

        for (const customerData of customersData) {
            const customer = new Customer({
                ...customerData,
                password: hashedPassword,
            });
            await customer.save();
            // console.log(`Customer ${customerData.firstName} seeded successfully.`);
        }

        // mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding customers:", error);
    }
};

module.exports = {
    seedCustomer,
    seedCustomers,
};
