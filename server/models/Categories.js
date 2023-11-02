const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
    },

    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Categories", CategoriesSchema);
