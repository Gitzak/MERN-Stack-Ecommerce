require('dotenv').config();

// Import the seedUser function from seed.js
const { seedUser } = require('./seedrs/userSeed');

async function runSeed() {
    try {
        // Run the specified seed function (in this case, seedUser)
        await seedUser();
        // await seedUsers(10);
        console.log('Seed completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}

// Execute the seed process
runSeed();
