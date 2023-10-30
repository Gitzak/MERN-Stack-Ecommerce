const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const { validateSubCategoryForm, validateSubCategoryFormUpdate } = require("../../middleware/ValidateFormMiddleweare");
const { handleValidationErrors } = require("../../middleware/handleValidationErrors");
const {
  createsubCategories,
  getsubCategories,
  getsubCategoryById,
  updatesubCategories,
  deletesubCategories,
} = require('../../controllers/subcategoriesController')

// Create a new subCategories
router.post("/", isAdminManager, validateSubCategoryForm, handleValidationErrors, createsubCategories);
// List all the subcategories
router.get("/", getsubCategories);
// Get subCategories by ID
router.get("/:id", getsubCategoryById);
// Update the subCategories data
router.put("/:id", isAdminManager, validateSubCategoryFormUpdate, handleValidationErrors, updatesubCategories);
// Delete a subCategories
router.delete("/:id", isAdminManager, deletesubCategories);

module.exports = router;
