const mongoose = require("mongoose");

const productOptionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    option: [String],
});

const productSchema = new mongoose.Schema(
    {
        sku: {
            type: String,
            required: true,
            unique: true,
        },
        // productImage: {
        //   type: String,
        //   required: true,
        // },
        productImages: [String],
        productName: {
            type: String,
            required: true,
            unique: true,
        },
        // subcategoryId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "subCategories",
        //     required: true,
        // },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
        ],
        shortDescription: {
            type: String,
            required: true,
        },
        longDescription: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        options: [
            {
                label: { type: String, required: true },
                option: [String],
            },
        ],
        active: {
            type: Boolean,
            default: false,
        },
        recommended: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
