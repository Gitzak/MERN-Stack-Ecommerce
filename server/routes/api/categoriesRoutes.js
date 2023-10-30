const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const { validateCategoryForm, validateCategoryFormUpdate } = require("../../middleware/ValidateFormMiddleweare");
const { handleValidationErrors } = require("../../middleware/handleValidationErrors");
const {
  createCategories,
  getCategories,
  getCategoryById,
  updateCategories,
  deleteCategories,
} = require('../../controllers/categoriesController')

// Create a new Categories
router.post("/", isAdminManager, validateCategoryForm, handleValidationErrors, createCategories);
// List all the categories
router.get("/", getCategories);
// Get Categories by ID
router.get("/:id", getCategoryById);
// Update the Categories data
router.put("/:id", isAdminManager, validateCategoryFormUpdate, handleValidationErrors, updateCategories);
// Delete a Categories
router.delete("/:id", isAdminManager, deleteCategories);

module.exports = router;
