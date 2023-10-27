const { subCategoriesService } = require("../services/subCategoriesService");
const { subCategoryRepository } = require("../repositories/subCategoryRepository");
const subCategories = require("../models/subCategories.js");

const subCategoriesRepo = new subCategoryRepository(subCategories);
const subCategoriesServ = new subCategoriesService(subCategoriesRepo);

// Create a new subCategories
exports.createsubCategories = async (req, res) => {
  const newsubCategories = await subCategoriesServ.createsubCategories(req);
  res.json(newsubCategories);
};
// List all subcategories
exports.getsubCategories = async (req, res) => {
  const subcategories = await subCategoriesServ.getsubCategories(req);
  res.json(subcategories);
};

// Get subCategories by ID
exports.getsubCategoryById = async (req, res) => {
  const foundedsubCategory = await subCategoriesServ.getsubCategoryById(req);
  res.json(foundedsubCategory);
};

// Update the subCategories data
exports.updatesubCategories = async (req, res) => {
  const updatedsubCategories = await subCategoriesServ.updatesubCategories(req);
  res.json(updatedsubCategories);
};

// Delete a subCategories
exports.deletesubCategories = async (req, res) => {
  const result = await subCategoriesServ.deletesubCategories(req);
  res.json(result);
};
