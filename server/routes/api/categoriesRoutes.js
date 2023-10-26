const express = require("express");
const router = express.Router();

// Import your controller functions
const {
  createCategories,
  getCategories,
  getCategoryById,
  updateCategories,
  deleteCategories,
} = require('../../controllers/categoriesController')

// Categories routes

// Create a new Categories
router.post("/", createCategories);
// List all the categories
router.get("/", getCategories);
// Get Categories by ID
router.get("/:id", getCategoryById);
// Update the Categories data
router.put("/:id", updateCategories);
// Delete a Categories
router.delete("/:id", deleteCategories);

module.exports = router;
