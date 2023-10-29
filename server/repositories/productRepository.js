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
    // todo : Get Catagory Name
    const product = await this.productModel.findById(productId);
    return product;
  }

  async updateProduct(productId, productData) {
    const filter = { _id: productId };
    const updateData = { $set: productData };

    const result = await this.productModel.updateOne(filter, updateData, { upsert: true, new: true });

    return result;
  }

  async listProducts(skip, limit, sort) {
    const products = await this.productModel
      .aggregate({ $sort: { creationDate: -1 } })
      .skip(skip)
      .limit(limit)
      .exec();
    return products;
  }

  async searchProduct(query, skip, limit, sort) {
    const queryOptions = {
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { shortDescription: { $regex: query, $options: "i" } },
        { longDescription: { $regex: query, $options: "i" } },
      ],
    };

    const searchedProducts = await this.productModel
      .find(queryOptions)
      .sort({ productName: sort === "ASC" ? 1 : -1 })
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
