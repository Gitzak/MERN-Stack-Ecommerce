const { ProductService } = require("../services/productService");
const { ProductRepository } = require("../repositories/productRepository");
const Product = require("../models/Product");

const ProductRepo = new ProductRepository(Product);
const ProductServ = new ProductService(ProductRepo);

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await ProductServ.createProduct(req.body);
    res.json(newProduct);
  } catch (error) {
    throw error
  }
};

// List all products
exports.listProducts = async (req, res) => {
  try {
    const products = await ProductServ.listProducts();
    res.json(products);
  } catch (error) {
    throw error
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await ProductServ.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ status: 200, data: [product] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update product data
exports.updateProductData = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await ProductServ.updateProduct(productId, req.body);
    res.json(updatedProduct);
  } catch (error) {
    throw error 
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServ.deleteProduct(productId);
    res.json(result);
  } catch (error) {
    throw error
  }
};
