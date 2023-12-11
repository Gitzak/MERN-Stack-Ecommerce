const CONSTANTS = require("../constants");
const config = require("../config/keys");
const cloudinary = require("../utils/cloudinary");
const { checkCategoryById } = require("../controllers/categoriesController");
const { listOrders, listForBestSeller } = require("../controllers/ordersController");

class ProductService {
    constructor(productRepo, OrderRepo) {
        this.productRepo = productRepo;
        this.OrderRepo = OrderRepo;
    }

    async createProduct(req) {
        const response = {};
        try {
            // Extract data from the request
            const { sku, productName, categories, shortDescription, longDescription, price, discountPrice, quantity, options, active, recommended } = req.body;

            const categoriesArray = categories.split(",");
            // console.log(categoriesArray);

            // Check if any of the categories don't exist
            for (const categoryId of categoriesArray) {
                const category = await checkCategoryById(categoryId);
                if (category?.status === 404) {
                    response.message = "You cannot create this product because one or more categories were not found.";
                    response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                    return response;
                }
            }

            // Check if a product with the same name or SKU already exists
            const existingProductByName = await this.productRepo.findProductByName(productName);

            if (existingProductByName) {
                response.message = "Product name already exists.";
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            const existingProductBySku = await this.productRepo.findProductBySku(sku);

            if (existingProductBySku) {
                response.message = "Product SKU already exists.";
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            // console.log(JSON.parse(`${options}`));
            // return;

            // Continue with the image uploading logic
            const imagesUrlPromises = req.files.map((file) => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(file.path, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.secure_url);
                        }
                    });
                });
            });

            const imagesUrls = await Promise.all(imagesUrlPromises);

            // Create a new product object
            const newProduct = {
                sku,
                productImages: imagesUrls,
                productName,
                categories: categoriesArray,
                shortDescription,
                longDescription,
                price,
                discountPrice,
                quantity,
                options: options ? JSON.parse(`${options}`) : [],
                active,
                recommended,
            };

            // Create the product
            const product = await this.productRepo.createProduct(newProduct);

            // console.log(product);

            if (!product) {
                response.message = CONSTANTS.SERVER_ERROR;
                response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
                return response;
            }

            response.message = CONSTANTS.PRODUCT_CREATED;
            response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
            response.data = product;
            return response;
        } catch (error) {
            // console.log(error);
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async updateProduct(req) {
        const response = {};
        try {
            const productId = req.params.id;

            const { sku, productName, categories, shortDescription, longDescription, price, discountPrice, quantity, options, active, recommended } = req.body;

            const categoriesArray = categories.split(",");

            const updatedProduct = {
                sku,
                productName,
                categories: categoriesArray,
                shortDescription,
                longDescription,
                price,
                discountPrice,
                quantity,
                options: options ? JSON.parse(`${options}`) : [],
                active,
                recommended,
            };

            // Check if any of the categories don't exist
            for (const categoryId of categoriesArray) {
                const category = await checkCategoryById(categoryId);

                if (category?.status === 404) {
                    response.message = "You cannot create this product because one or more categories were not found.";
                    response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                    return response;
                }
            }

            // If all checks pass, update the product
            const updateResult = await this.productRepo.updateProduct(productId, updatedProduct);

            if (updateResult.modifiedCount === 1) {
                response.message = CONSTANTS.PRODUCT_UPDATED_SUCCESS;
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                return response;
            } else if (updateResult.matchedCount === 1) {
                response.message = CONSTANTS.PRODUCT_NO_CHANGE_MADE;
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                return response;
            } else {
                response.message = CONSTANTS.PRODUCT_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
        } catch (error) {
            // console.log(error);
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                response.message = CONSTANTS.PRODUCT_DUPLICATE_KEY(field);
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async getProductById(req) {
        const response = {};
        try {
            const productId = req.params.id;
            const product = await this.productRepo.getProductById(productId);

            if (!product) {
                response.message = CONSTANTS.PRODUCT_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = product;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async getProducts(req) {
        // const query = req.query.query;
        // const page = parseInt(req.query.page) || 1;
        // const sort = req.query.sort || "DESC";
        // const pageSize = 10;
        // const skip = (page - 1) * pageSize;
        // const limit = pageSize;

        // if (req.query.query) {
        //     try {
        //         const searchProducts = await this.productRepo.searchProduct(
        //             query,
        //             skip,
        //             limit,
        //             sort
        //         );
        //         return searchProducts;
        //     } catch (error) {
        //         return error;
        //     }
        // } else {
        //     const response = {};
        //     response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        //     const products = await this.productRepo.listProducts();
        //     response.products = products;
        //     return response;
        // }
        try {
            const response = {};
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            const products = await this.productRepo.listProducts();
            response.products = products;
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async listShopProducts(req) {
        const query = req.query.query;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || "DESC";
        const pageSize = 9;
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        if (req.query.query) {
            try {
                const searchProducts = await this.productRepo.searchProduct(query, skip, limit, sort);
                return searchProducts;
            } catch (error) {
                return error;
            }
        } else {
            const response = {};
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            const products = await this.productRepo.listShopsProducts(skip, limit, sort);
            console.log(products);
            response.products = products;
            return response;
        }
    }

    async getNewestProducts(req) {
        const query = req.query.query;
        const response = {};
        const products = await this.productRepo.getNewestProducts(8);
        response.products = products;
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        return response;
    }

    async getRecommendedProducts(req) {
        const query = req.query.query;
        const response = {};
        const products = await this.productRepo.getRecommendedProducts(8);
        response.products = products;
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        return response;
    }

    async getBestProducts(req) {
        const query = req.query.query;
        const response = {};
        const products_saled = await this.OrderRepo.getBestProducts(8);

        const products_ids = products_saled.map((product) => product.productId);

        const products = await this.productRepo.getBestProductsByIDs(products_ids);

        response.products = products;
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        return response;
    }

    async deleteProduct(req) {
        const response = {};

        try {
            const productId = req.params.id;
            const deletedProduct = await this.productRepo.deleteProduct(productId);

            if (!deletedProduct) {
                response.message = CONSTANTS.PRODUCT_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }

            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = CONSTANTS.PRODUCT_DELETED_SUCCESS;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            console.error(error);
        }
    }
}

module.exports = { ProductService };
