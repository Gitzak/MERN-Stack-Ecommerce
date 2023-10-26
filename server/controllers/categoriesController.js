const { CategoriesService } = require("../services/categoriesService");
const {
  CategoriesRepository,
} = require("../repositories/categoriesRepository");
const Categories = require("../models/Categories.js");

const CategoriesRepo = new CategoriesRepository(Categories);
const CategoriesServ = new CategoriesService(CategoriesRepo);

// Create a new Categories
const createCategories = async (req, res) => {
  const newCategories = await CategoriesServ.createCategories(req);
  res.json(newCategories);
};
// List all categories
const getCategories = async (req, res) => {
  const categories = await CategoriesServ.listCategories(req);
  res.json(categories);
};

// Get Categories by ID
const getCategoriesById = async (req, res) => {
  try {
    const Categories = await CategoriesServ.getCategoriesById(req);
    if (!Categories) {
      return res.status(404).json({ message: "Categories not found" });
    }
    return res.status(200).json({ status: 200, data: [Categories] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update the Categories data
const updateCategories = async (req, res) => {
  const updatedCategories = await CategoriesServ.updateCategories(req);
  res.json(updatedCategories);
};

// Delete a Categories
const deleteCategories = async (req, res) => {
  const result = await CategoriesServ.deleteCategories(req);
  res.json(result);
};

module.exports = {
  createCategories,
  getCategories,
  getCategoriesById,
  updateCategories,
  deleteCategories,
};

module.exports = router;
