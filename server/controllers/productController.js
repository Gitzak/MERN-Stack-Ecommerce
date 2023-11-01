const { ProductService } = require("../services/productService");
const { ProductRepository } = require("../repositories/productRepository");
const Product = require("../models/Product");

const { getsubCategoryNameById } = require('../controllers/subcategoriesController')

const ProductRepo = new ProductRepository(Product);
const ProductServ = new ProductService(ProductRepo);

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await ProductServ.createProduct(req);
    res.json(newProduct);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Duplicate product. Please use a different SKU.' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the product.' });
    }
  }
};

// List all products
exports.listProducts = async (req, res) => {
  try {
    const products = await ProductServ.getProducts(req);
    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the products.' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await ProductServ.getProductById(req);
    const subCaId = product.subcategoryId
    const subcategoryName = await getsubCategoryNameById(subCaId)
    const updatedProduct = { ...product._doc, subcategoryName: subcategoryName };
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the product.' });
  }
};

// Update product data
exports.updateProductData = async (req, res) => {
  try {
    const updatedProduct = await ProductServ.updateProduct(req);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the product.' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const result = await ProductServ.deleteProduct(req);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
};
