const CONSTANTS = require("../constants/index");

class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel;
    }

    async createProduct(product) {
        const newProduct = await this.productModel.create(product);
        return newProduct;
    }

    async getProductById(productId) {
        const product = await this.productModel.findById(productId).populate("categories").exec();
        return product;
    }

    async findProductByName(productName) {
        const product = await this.productModel.findOne({
            productName: productName,
        });
        return product;
    }

    async findProductBySku(sku) {
        const product = await this.productModel.findOne({ sku: sku });
        return product;
    }

    async hasProducts(id) {
        const hasProducts = await this.productModel.countDocuments({
            categories: id,
        });
        return hasProducts > 0;
    }

    async updateProduct(productId, productData) {
        const filter = { _id: productId };
        const updateData = { $set: productData };

        const result = await this.productModel.updateOne(filter, updateData, {
            upsert: false,
            new: true,
        });

        return result;
    }

    async listProducts() {
        const products = await this.productModel.find().sort({ createdAt: 1 }).populate("categories").exec();
        return products;
    }

    async getNewestProducts(limit) {
        const products = await this.productModel.find().sort({ createdAt: -1 }).limit(limit).exec();
        return products;
    }

    async getRecommendedProducts(limit) {
        const products = await this.productModel.find({ recommended: true }).sort({ createdAt: -1 }).limit(limit).exec();
        return products;
    }

    async getBestProductsByIDs(ids) {
        const products = await this.productModel.find({
            _id: { $in: ids },
        });
        return products;
    }

    async searchProduct(query, skip, limit, sort) {
        let sortOption = { price: 1 }; // Default sort by price in ascending order

        if (sort === "DESC") {
            sortOption = { price: -1 }; // If sort parameter is DESC, sort by price in descending order
        }

        const queryOptions = {
            $or: [{ productName: { $regex: query, $options: "i" } }, { shortDescription: { $regex: query, $options: "i" } }, { longDescription: { $regex: query, $options: "i" } }],
        };

        const limitValue = parseInt(limit); // Parse the limit parameter to ensure it's a number
        const searchedProducts = await this.productModel
            .find(queryOptions)
            .sort(sortOption) // Apply the selected sort order
            .populate("categories")
            .skip(skip)
            .limit(limitValue); // Use the parsed limit value

        return searchedProducts;
    }

    async listShopsProducts(skip, limit, sort) {
        let sortOption = { price: 1 }; // Default sort by price in ascending order

        if (sort === "DESC") {
            sortOption = { price: -1 }; // If sort parameter is DESC, sort by price in descending order
        }

        const limitValue = parseInt(limit); // Parse the limit parameter to ensure it's a number
        const products = await this.productModel
            .find()
            .sort(sortOption) // Apply the selected sort order
            .populate("categories")
            .skip(skip)
            .limit(limitValue); // Use the parsed limit value

        return products;
    }

    async deleteProduct(productId) {
        const product = await this.productModel.findByIdAndDelete(productId);
        return product;
    }
}

module.exports = { ProductRepository };
