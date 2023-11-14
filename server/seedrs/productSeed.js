const config = require("../config/keys");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const generateDynamicProductData = (count) => {
    const productsData = [];

    for (let i = 1; i <= count; i++) {
        const productData = {
            sku: `SKU-${i}`,
            productImages: [],
            productName: `Product ${i}`,
            categories: ["6549358275789dcb780a925c", "654933838937e7b1f0687109"],
            shortDescription: `Short description for product ${i}`,
            longDescription: `Long description for product ${i}`,
            price: Math.floor(Math.random() * 100) + 1, // Random price
            discountPrice: Math.floor(Math.random() * 50), // Random discount price
            options: [],
            active: i % 2 === 0, // Alternate between true and false for 'active'
        };

        productsData.push(productData);
    }

    return productsData;
};

const seedProducts = async (count) => {
    try {
        await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const productsData = generateDynamicProductData(count);

        for (const productData of productsData) {
            const product = new Product({
                ...productData,
            });
            await product.save();
            // console.log(`Product ${productData.product_name} seeded successfully.`);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding products:", error);
    }
};

module.exports = {
    seedProducts,
};
