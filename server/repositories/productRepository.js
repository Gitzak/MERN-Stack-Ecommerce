const CONSTANTS = require("../constants/index");

class ProductRepository {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async createProduct(product) {
    try {
        const newProduct = await this.productModel.create(product);
        return newProduct;
    } catch (error) {
        throw error
    }
  }

  async getProductById(productId) {
    try {
        const product = await this.productModel.findById(productId);
        return product;
    } catch (error) {
        throw error
    }
  }

  async updateProduct(productId, productData) {
    try {
      const filter = { _id: productId };
      const updateData = { $set: productData };
  
      const result = await this.productModel.findOneAndUpdate(filter, updateData, { upsert: true, new: true });
  
      if (result.matchedCount === 1) {
        return {
          message: CONSTANTS.PRODUCT_UPDATED,
          status: CONSTANTS.SERVER_UPDATED_HTTP_CODE,
        };
      } else {
        return {
          message: CONSTANTS.PRODUCT_NOT_FOUND,
          status: CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE,
        };
      } 
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
          { product_name: { $regex: query, $options: "i" } },
          { short_description: { $regex: query, $options: "i" } },
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

module.exports = ProductRepository;
