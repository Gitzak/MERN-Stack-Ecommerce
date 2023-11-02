const cloudinary = require("cloudinary").v2;

const config = require("../config/keys");

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
});

module.exports = cloudinary;
