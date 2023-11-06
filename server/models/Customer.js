const mongoose = require("mongoose");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

// At least one digit, one lowercase, one uppercase letter, and minimum length of 8 characters
const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}$/;

const CustomerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: emailRegex,
            // immutable: true
        },
        password: {
            type: String,
            required: true,
            // match: passwordRegex,
        },
        creationDate: {
            type: Number,
            default: Date.now,
        },
        lastLogin: {
            type: Number,
            default: null,
        },
        validatAccount: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Customer", CustomerSchema);
