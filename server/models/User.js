const mongoose = require("mongoose");

const { ROLES_USER } = require("../constants");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// At least one digit, one lowercase, one uppercase letter, and minimum length of 8 characters
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: emailRegex,
        },
        password: {
            type: String,
            required: true,
            // match: passwordRegex,
        },
        role: {
            type: String,
            enum: [ROLES_USER.Admin, ROLES_USER.Manager],
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        creationDate: {
            type: Number,
            default: Date.now,
        },
        lastLogin: {
            type: Number,
            default: null,
        },
        lastUpdate: {
            type: Number,
            default: null,
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

userSchema.virtual("creationDateFormatted").get(function () {
    const timestamp = this.creationDate;
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can format the date and time as desired
});

userSchema.virtual("lastLoginFormatted").get(function () {
    const timestamp = this.lastLogin;
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can format the date and time as desired
});

userSchema.virtual("lastUpdateFormatted").get(function () {
    const timestamp = this.lastUpdate;
    if (timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString(); // You can format the date and time as desired
    } else {
        return "N/A"; // Handle the case when lastUpdate is null or undefined
    }
});

module.exports = mongoose.model("User", userSchema);
