const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
            required: true,
            // unique: true,
        },
        description: {
            type: String,
            required: false,
            default: "",
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            type: String,
            required: false,
            // default: null,
        },
        parentName: {
            type: String,
            required: false,
            default: null,
        },
        image: {
            type: String,
            required: false,
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

module.exports = mongoose.model("Category", CategorySchema);
