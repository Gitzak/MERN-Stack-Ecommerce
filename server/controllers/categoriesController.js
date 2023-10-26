const { CategoriesService } = require("../services/categoriesService");
const {
  CategoryRepository,
} = require("../repositories/categoryRepository");
const Categories = require("../models/Categories.js");

const CategoriesRepo = new CategoryRepository(Categories);
const CategoriesServ = new CategoriesService(CategoriesRepo);

// Create a new Categories
exports.createCategories = async (req, res) => {
  const newCategories = await CategoriesServ.createCategories(req);
  res.json(newCategories);
};
// List all categories
exports.getCategories = async (req, res) => {
  const categories = await CategoriesServ.getCategories(req);
  res.json(categories);
};

// Get Categories by ID
exports.getCategoryById = async (req, res) => {
    const foundedCategory = await CategoriesServ.getCategoryById(req);
    res.json(foundedCategory);

};

// Update the Categories data
exports.updateCategories = async (req, res) => {
  const updatedCategories = await CategoriesServ.updateCategories(req);
  res.json(updatedCategories);
};

// Delete a Categories
exports.deleteCategories = async (req, res) => {
  const result = await CategoriesServ.deleteCategories(req);
  res.json(result);
};
