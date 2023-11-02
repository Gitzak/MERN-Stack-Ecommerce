const { subCategoriesService } = require("../services/subCategoriesService");
const { subCategoryRepository } = require("../repositories/subCategoryRepository");
const subCategories = require("../models/subCategories.js");
const Category = require("../models/Categories.js"); // Adjust the path if needed

const subCategoriesRepo = new subCategoryRepository(subCategories, Category);
const subCategoriesServ = new subCategoriesService(subCategoriesRepo);

// Create a new subCategories
exports.createsubCategories = async (req, res) => {
  try {
    const newsubCategories = await subCategoriesServ.createsubCategories(req);
    res.json(newsubCategories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// List all subcategories
exports.getsubCategories = async (req, res) => {
  try {
    const subcategories = await subCategoriesServ.getsubCategories(req);
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get subCategories by ID
exports.getsubCategoryById = async (req, res) => {
  try {
    const foundedsubCategory = await subCategoriesServ.getsubCategoryById(req);
    res.json(foundedsubCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

exports.getsubCategoryNameById = async (id) => {
  try {
    const foundedsubCategoryName = await subCategoriesServ.getsubCategoryNameById(id);
    // console.log(foundedsubCategoryName);
    return foundedsubCategoryName;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}



// Update the subCategories data
exports.updatesubCategories = async (req, res) => {
  try {
    const updatedsubCategories = await subCategoriesServ.updatesubCategories(req);
    res.json(updatedsubCategories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a subCategories
exports.deletesubCategories = async (req, res) => {
  try {
    const result = await subCategoriesServ.deletesubCategories(req);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
