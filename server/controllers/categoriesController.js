const { CategoriesService } = require("../services/categoriesService");
const { CategoryRepository } = require("../repositories/categoryRepository");
const { ProductRepository } = require("../repositories/productRepository");

const Categories = require("../models/Category");
const CONSTANTS = require("../constants/index");
const Product = require("../models/Product");

const ProductRepo = new ProductRepository(Product);
const CategoriesRepo = new CategoryRepository(Categories);
const CategoriesServ = new CategoriesService(CategoriesRepo,ProductRepo);

// Create a new Categories
exports.createCategories = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);
        // return
        const newCategories = await CategoriesServ.createCategories(req);
        res.status(newCategories.status).json(newCategories);
    } catch (error) {
        console.log("Errr " + error);
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// List all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await CategoriesServ.getCategories(req);
        res.status(categories.status).json(categories);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

exports.checkCategoryById = async (id) => {
    const response = {};
    try {
        const category = await CategoriesServ.findCategoryById(id);
        return category;
    } catch (error) {
        response.message = CONSTANTS.SERVER_ERROR;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return response;
    }
};

// check Categorie by ID
exports.getCategoryById = async (req, res) => {
    try {
        const foundedCategory = await CategoriesServ.getCategoryById(req);
        res.status(foundedCategory.status).json(foundedCategory);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Update the Categories data
exports.updateCategories = async (req, res) => {
    try {
        const updatedCategories = await CategoriesServ.updateCategories(req);
        res.status(updatedCategories.status).json(updatedCategories);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Delete a Categories
exports.deleteCategories = async (req, res) => {
    try {
        const result = await CategoriesServ.deleteCategories(req);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};
