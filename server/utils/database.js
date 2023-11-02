const { color, database } = require("../config/keys");

const mongoose = require("mongoose");

exports.connection = () => {
    function connectToMongo() {
        mongoose
            .connect(database.url)
            .then(
                () => {},
                (err) => {
                    console.info(color.red, "Mongodb error", err);
                }
            )
            .catch((err) => {
                console.log(color.red, "ERROR:", err);
            });
    }

    mongoose.connection.on("connected", () => {
        console.info(color.green, "Connected to MongoDB ✓");
    });

    mongoose.connection.on("reconnected", () => {
        console.info("MongoDB reconnected!");
    });

    mongoose.connection.on("error", (error) => {
        console.error(color.red, `Error in MongoDb connection: ${error}`);
        mongoose.disconnect();
    });

    mongoose.connection.on("disconnected", () => {
        console.error(color.red, `MongoDB disconnected! Reconnecting in ${2000 / 1000}s...`);
        setTimeout(() => connectToMongo(), 2000);
    });

    return {
        connectToMongo,
    };
};
