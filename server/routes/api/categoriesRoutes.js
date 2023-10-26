const express = require("express");
const router = express.Router();

// Import your controller functions
const {
  getCategoriesById,
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../../controllers/categoriesController");

// Categories routes
// Create a new Categories
router.post("/categories", createCategories);
// List all the categories
router.get("/categories", getCategories);
// Get Categories by ID
router.get("/categories/:id", getCategoriesById);
// Update the Categories data
router.put("/categories/:id", updateCategories);
// Delete a Categories
router.delete("/categories/:id", deleteCategories);

module.exports = router;
