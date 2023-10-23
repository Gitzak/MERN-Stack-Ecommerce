const mongoose = require('mongoose');

const { ROLES_USER } = require('../constants');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// At least one digit, one lowercase, one uppercase letter, and minimum length of 8 characters
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const userSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('User', userSchema);
