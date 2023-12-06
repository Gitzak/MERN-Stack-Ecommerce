require('dotenv').config();

const { seedCustomers, seedCustomer } = require('./seedrs/customerSeed');
// Import the seedUser function from seed.js
const { seedUser, seedUsers } = require('./seedrs/userSeed');

const { seedProducts } = require('./seedrs/productSeed');


async function runSeeduser() {
    try {
        // Run the specified seed function (in this case, seedUser)
        await seedUser();
        console.log('Seed completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}

// Execute the seed process
async function runSeedusers() {
    try {
        // Run the specified seed function (in this case, seedUser)
        await seedUsers(10);
        console.log('Seed completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}
// runSeeduser();
// runSeedusers();


async function runSeedCustom() {
    try {
        // Run the specified seed function (in this case, seedUser)
        await seedCustomer();
        console.log('Seed completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}

async function runSeedsCustoms() {
    try {
        // Run the specified seed function (in this case, seedUser)
        await seedCustomers(22);
        console.log('Seed completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}
// runSeedCustom()
// runSeedsCustoms()

async function runSeedsProducts() {
    try {
        // Run the specified seed function (in this case, seedUser)
        await seedProducts(12);
        console.log('Seed completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}
runSeedsProducts();