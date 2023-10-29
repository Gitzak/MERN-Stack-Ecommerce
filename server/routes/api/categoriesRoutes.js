const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const {
  createCategories,
  getCategories,
  getCategoryById,
  updateCategories,
  deleteCategories,
} = require('../../controllers/categoriesController')

// Create a new Categories
router.post("/", isAdminManager, createCategories);
// List all the categories
router.get("/", getCategories);
// Get Categories by ID
router.get("/:id", getCategoryById);
// Update the Categories data
router.put("/:id", isAdminManager, updateCategories);
// Delete a Categories
router.delete("/:id", isAdminManager, deleteCategories);

module.exports = router;
