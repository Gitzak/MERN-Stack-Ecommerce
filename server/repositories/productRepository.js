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
    const product = await this.productModel.findById(productId);
    return product;
  }

  async updateProduct(productId, productData) {
    try {
      const filter = { _id: productId };
      const updateData = { $set: productData };

      const result = await this.productModel.updateOne(filter, updateData, { upsert: true, new: true });

      return result;
    } catch (error) {
      throw error
    }
  }

  async listProducts(skip, limit, sort) {
    try {
      const products = await this.productModel
        .aggregate({ $sort: { creationDate: -1 } })
        .skip(skip)
        .limit(limit)
        .exec();
      return products;
    } catch (error) {
      throw error
    }
  }

  async searchProduct(query) {
    try {
      const searchedProducts = await this.productModel.find({
        $or: [
          { productName: { $regex: query, $options: "i" } },
          { shortDescription: { $regex: query, $options: "i" } },
          { longDescription: { $regex: query, $options: "i" } },
        ],
      });
      return searchedProducts;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    const product = await this.productModel.findByIdAndDelete(productId);
    return product;
  }
}

module.exports = { ProductRepository };
