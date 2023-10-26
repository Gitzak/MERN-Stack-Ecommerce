const CONSTANTS = require("../constants");
const config = require("../config/keys");

class ProductService {
  constructor(productRepo) {
    this.productRepo = productRepo;
  }

  async createProduct(req) {
    try {
        const response = {};
        const { sku, product_image, product_name, subcategory_id, short_description, 
            long_description, price, discount_price, options, active } = req.body;
    
        const newProduct = {
          sku,
          product_image,
          product_name,
          subcategory_id,
          short_description,
          long_description,
          price,
          discount_price,
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

  async updateProductData(req) {
      try {
        const productId = req.params.productId;
      
        const response = {};
      
        const { sku, product_image, product_name, subcategory_id, short_description,
             long_description, price, discount_price, options, active } = req.body;
      
        const updatedProduct = {
          sku,
          product_image,
          product_name,
          subcategory_id,
          short_description,
          long_description,
          price,
          discount_price,
          options,
          active,
        };
      
        const updatedProductData = await this.productRepo.updateProduct(productId, updatedProduct);
      
        response.message = updatedProductData;
      
        return response;
    } catch (error) {
        throw error
    }
  }

  async getProductById(req) {
    try {
      const productId = req.params.productId;
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
      const productId = req.params.productId;
      const deletedProduct = await this.productRepo.deleteProduct(productId);

      if (!deletedProduct) {
        response.message = CONSTANTS.PRODUCT_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
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

module.exports = ProductService;
