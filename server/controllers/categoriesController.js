const { CategoriesService } = require("../services/categoriesService");
const { CategoryRepository } = require("../repositories/categoryRepository");
const Categories = require("../models/Categories.js");

const CategoriesRepo = new CategoryRepository(Categories);
const CategoriesServ = new CategoriesService(CategoriesRepo);

// Create a new Categories
exports.createCategories = async (req, res) => {
    try {
        const newCategories = await CategoriesServ.createCategories(req);
        res.json(newCategories);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating categories." });
        console.error("Error creating categories:", error);
    }
};

// List all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await CategoriesServ.getCategories(req);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching categories." });
        console.error("Error fetching categories:", error);
    }
};

// Get Categories by ID
exports.getCategoryById = async (req, res) => {
    try {
        const foundedCategory = await CategoriesServ.getCategoryById(req);
        if (!foundedCategory) {
            res.status(404).json({ error: "Category not found." });
        } else {
            res.json(foundedCategory);
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the category." });
        console.error("Error fetching the category:", error);
    }
};

// Update the Categories data
exports.updateCategories = async (req, res) => {
    try {
        const updatedCategories = await CategoriesServ.updateCategories(req);
        res.json(updatedCategories);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating categories." });
        console.error("Error updating categories:", error);
    }
};

// Delete a Categories
exports.deleteCategories = async (req, res) => {
    try {
        const result = await CategoriesServ.deleteCategories(req);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the category." });
        console.error("Error deleting the category:", error);
    }
};
