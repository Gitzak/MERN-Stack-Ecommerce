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
        const product = await this.productModel
            .findById(productId)
            .populate("categories") // Populate the subcategory data
            .exec();
        return product;
    }

    async findProductByName(productName) {
        const product = await this.productModel.findOne({ productName: productName });
        return product;
    }

    async findProductBySku(sku) {
        const product = await this.productModel.findOne({ sku: sku });
        return product;
    }

    async updateProduct(productId, productData) {
        const filter = { _id: productId };
        const updateData = { $set: productData };

        const result = await this.productModel.updateOne(filter, updateData, { upsert: false, new: true });
        
        return result;
    }

    async listProducts(skip, limit, sort) {
        const products = await this.productModel
            .find()
            .sort({ creationDate: sort === "ASC" ? 1 : -1 })
            .populate("subcategoryId") // Populate the subcategory data
            .skip(skip)
            .limit(limit)
            .exec();
        return products;
    }

    async searchProduct(query, skip, limit, sort) {
        const queryOptions = {
            $or: [{ productName: { $regex: query, $options: "i" } }, { shortDescription: { $regex: query, $options: "i" } }, { longDescription: { $regex: query, $options: "i" } }],
        };

        const searchedProducts = await this.productModel
            .find(queryOptions)
            .sort({ productName: sort === "ASC" ? 1 : -1 })
            .populate("subcategoryId") // Populate the subcategory data
            .skip(skip)
            .limit(limit);

        return searchedProducts;
    }

    async deleteProduct(productId) {
        const product = await this.productModel.findByIdAndDelete(productId);
        return product;
    }
}

module.exports = { ProductRepository };
