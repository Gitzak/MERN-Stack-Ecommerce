const CONSTANTS = require("../constants");
const config = require("../config/keys");

class ProductService {
  constructor(productRepo) {
    this.productRepo = productRepo;
  }

  async createProduct(req) {
    try {
      const response = {};
      const { sku, productImage, productName, subcategoryId, shortDescription,
        longDescription, price, discountPrice, quantity, options, active } = req.body;

      const newProduct = {
        sku,
        productImage,
        productName,
        subcategoryId,
        shortDescription,
        longDescription,
        price,
        discountPrice,
        quantity,
        options,
        active,
      };

      const product = await this.productRepo.createProduct(newProduct);

      if (!product) {
        response.message = CONSTANTS.SERVER_ERROR_MESSAGE;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return response;
      }

      response.message = CONSTANTS.PRODUCT_CREATED;
      response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
      response.data = product;
      return response;
    } catch (error) {
      throw error
    }
  }

  async updateProduct(req) {
    try {
      const productId = req.params.id;
      const response = {};

      const { sku, productImage, productName, subcategoryId, shortDescription, longDescription, price, discountPrice, quantity, options, active } = req.body;

      const updatedProduct = {
        sku,
        productImage,
        productName,
        subcategoryId,
        shortDescription,
        longDescription,
        price,
        discountPrice,
        quantity,
        options,
        active,
      };

      // If all checks pass, update the product
      const updateResult = await this.productRepo.updateProduct(productId, updatedProduct);

      console.log(updateResult);

      if (updateResult.modifiedCount === 1) {
        return { status: 200, message: "Product updated successfully" };
      } else if (updateResult.matchedCount === 1) {
        return { status: 200, message: "No changes were made to the product" };
      } else {
        return { status: 404, message: "Product not found for the given ID" };
      }
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.productName) {
        return { status: 400, message: "The product name should be unique" };
      } else {
        throw error; // Re-throw any other error types
      }
    }
  }

  async getProductById(req) {
    try {
      const productId = req.params.id;
      const product = await this.productRepo.getProductById(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(req) {
    if (req.query.query) {
      try {
        const searchProducts = await this.productRepo.searchProduct(req.query.query);

        return searchProducts;
      } catch (error) {
        return error;
      }
    } else {
      const page = parseInt(req.query.page) || 1;
      const sort = req.query.sort || "ASC";
      console.log("page", page);
      console.log("sort", sort);
      const pageSize = 10; // Number of items per page
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      const response = {};
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      const products = await this.productRepo.listProducts(skip, limit, sort);
      response.products = products;
      return response;
    }
  }

  async deleteProduct(req) {
    const response = {};

    try {
      const productId = req.params.id;
      const deletedProduct = await this.productRepo.deleteProduct(productId);

      if (!deletedProduct) {
        response.message = "product deleted successfully";
        response.status = 200;
        return response;
      }

      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      response.message = CONSTANTS.PRODUCT_DELETED;
      return response;
    } catch (error) {
      response.message = "An error occurred while deleting the product.";
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      console.error(error);
    }
  }
}

module.exports = { ProductService };
