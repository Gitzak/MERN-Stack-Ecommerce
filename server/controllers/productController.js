const { ProductService } = require("../services/productService");
const { ProductRepository } = require("../repositories/productRepository");
const Product = require("../models/Product");
const Order = require("../models/Order");
const CONSTANTS = require("../constants/index");

const { getsubCategoryNameById } = require("../controllers/subcategoriesController");
const { OrderRepository } = require("../repositories/orderRepository");

const ProductRepo = new ProductRepository(Product);
const OrderRepo = new OrderRepository(Order);

const ProductServ = new ProductService(ProductRepo, OrderRepo);

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await ProductServ.createProduct(req);
        res.status(newProduct.status).json(newProduct);
    } catch (error) {
        // console.log(error);
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// List all products
exports.listProducts = async (req, res) => {
    try {
        const products = await ProductServ.getProducts(req);
        res.status(products.status).json(products);
    } catch (error) {
        console.log(error);
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// List all shop products
exports.listShopProducts = async (req, res) => {
    try {
        const products = await ProductServ.listShopProducts(req);
        res.status(products.status).json(products);
    } catch (error) {
        console.log(error);
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

//get newest Products:
exports.getNewestProducts = async(req, res) => {
    try {
        const products = await ProductServ.getNewestProducts(req);
        res.status(products.status).json(products);
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

//get best selling products
exports.getBestProducts = async(req, res) => {
    try {
        const products = await ProductServ.getBestProducts(req);
        res.status(products.status).json(products);
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};


//get recommended Products:
exports.getRecommendedProducts = async(req, res) => {
    try {
        const products = await ProductServ.getRecommendedProducts(req);
        res.status(products.status).json(products);
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await ProductServ.getProductById(req);
        res.status(product.status).json(product);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Update product data
exports.updateProductData = async (req, res) => {
    try {
        const updatedProduct = await ProductServ.updateProduct(req);
        res.status(updatedProduct.status).json(updatedProduct);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const result = await ProductServ.deleteProduct(req);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};
