const { ProductService } = require("../services/productService");
const { ProductRepository } = require("../repositories/productRepository");
const Product = require("../models/Product");

const { getsubCategoryNameById } = require("../controllers/subcategoriesController");

const ProductRepo = new ProductRepository(Product);
const ProductServ = new ProductService(ProductRepo);

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await ProductServ.createProduct(req);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// List all products
exports.listProducts = async (req, res) => {
    try {
        const products = await ProductServ.getProducts(req);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await ProductServ.getProductById(req);
        const subCaId = product.subcategoryId;
        const subcategoryName = await getsubCategoryNameById(subCaId);
        const updatedProduct = { ...product._doc, subcategoryName: subcategoryName };
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update product data
exports.updateProductData = async (req, res) => {
    try {
        const updatedProduct = await ProductServ.updateProduct(req);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const result = await ProductServ.deleteProduct(req);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
