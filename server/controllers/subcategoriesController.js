const { subCategoriesService } = require("../services/subCategoriesService");
const { subCategoryRepository } = require("../repositories/subCategoryRepository");
const subCategories = require("../models/subCategories.js");
const Category = require("../models/Category"); // Adjust the path if needed
const CONSTANTS = require("../constants/index");

const subCategoriesRepo = new subCategoryRepository(subCategories, Category);
const subCategoriesServ = new subCategoriesService(subCategoriesRepo);

// Create a new subCategories
exports.createsubCategories = async (req, res) => {
    try {
        const newsubCategories = await subCategoriesServ.createsubCategories(req);
        res.status(newsubCategories.status).json(newsubCategories);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// List all subcategories
exports.getsubCategories = async (req, res) => {
    try {
        const subcategories = await subCategoriesServ.getsubCategories(req);
        res.status(subCategories.status).json(subcategories);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Get subCategories by ID
exports.getsubCategoryById = async (req, res) => {
    try {
        const foundedsubCategory = await subCategoriesServ.getsubCategoryById(req);
        res.status(foundedsubCategory.status).json(foundedsubCategory);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

exports.getsubCategoryNameById = async (id) => {
    try {
        const foundedsubCategoryName = await subCategoriesServ.getsubCategoryNameById(id);
        // console.log(foundedsubCategoryName);
        return foundedsubCategoryName;
        // res.status(foundedsubCategoryName.status).json(foundedsubCategoryName);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Update the subCategories data
exports.updatesubCategories = async (req, res) => {
    try {
        const updatedsubCategories = await subCategoriesServ.updatesubCategories(req);
        res.status(updatedsubCategories.status).json(updatedsubCategories);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Delete a subCategories
exports.deletesubCategories = async (req, res) => {
    try {
        const result = await subCategoriesServ.deletesubCategories(req);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};
