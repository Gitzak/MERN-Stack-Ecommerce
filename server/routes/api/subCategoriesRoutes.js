const express = require("express");
const router = express.Router();

// Import your controller functions
const {
  createsubCategories,
  getsubCategories,
  getsubCategoryById,
  updatesubCategories,
  deletesubCategories,
} = require('../../controllers/subcategoriesController')

// subCategories routes

// Create a new subCategories
router.post("/", createsubCategories);
// List all the subcategories
router.get("/", getsubCategories);
// Get subCategories by ID
router.get("/:id", getsubCategoryById);
// Update the subCategories data
router.put("/:id", updatesubCategories);
// Delete a subCategories
router.delete("/:id", deletesubCategories);

module.exports = router;
