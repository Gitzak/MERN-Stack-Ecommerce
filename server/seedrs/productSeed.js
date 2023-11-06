const config = require("../config/keys");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const generateDynamicProductData = (count) => {
    const productsData = [];

    for (let i = 1; i <= count; i++) {
        const productData = {
            sku: `SKU-${i}`,
            product_image: `image-${i}.jpg`,
            product_name: `Product ${i}`,
            subcategory_id: `Subcategory-${i}`,
            short_description: `Short description for product ${i}`,
            long_description: `Long description for product ${i}`,
            price: Math.floor(Math.random() * 100) + 1, // Random price
            discount_price: Math.floor(Math.random() * 50), // Random discount price
            options: Buffer.from(`Options for product ${i}`),
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
