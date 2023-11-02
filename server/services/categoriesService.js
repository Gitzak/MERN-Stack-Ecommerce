const CONSTANTS = require("../constants");
const config = require("./../config/keys");

class CategoriesService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    // Create new category
    async createCategories(req) {
        const response = {};

        try {
            const { category_name, active } = req.body;

            const existingCategory = await this.categoryRepo.findCategoryByName(category_name);

            if (existingCategory) {
                response.message = `The category '${category_name}' already exists`;
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            const newCategory = {
                category_name,
                active,
            };

            const category = await this.categoryRepo.CreateCategory(newCategory);

            if (!category) {
                response.message = CONSTANTS.SERVER_ERROR;
                response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
                return response;
            }

            response.message = CONSTANTS.CATEGORY_CREATED_SUCCESS;
            response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    // Get and search for all Categories
    async getCategories(req) {
        const query = req.query.query;
        const response = {};
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || "ASC";
        // console.log("page", page);
        // console.log("sort", sort);
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        if (query) {
            try {
                const searchedCategories = await this.categoryRepo.searchCategories(query, skip, limit, sort);
                if (!searchedCategories) {
                    response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                    response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                    return response;
                }
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                response.data = searchedCategories;
                return response;
            } catch (error) {
                response.message = error.message;
                response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
                return response;
            }
        } else {
            const categories = await this.categoryRepo.getCategories(skip, limit, sort);
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = categories;
            return response;
        }
    }

    // Get one Category by its ID
    async getCategoryById(req) {
        const response = {};
        try {
            const categoryId = req.params.id;
            const foundedCategory = await this.categoryRepo.findCategoryById(categoryId);

            if (!foundedCategory) {
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                return response;
            }
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = foundedCategory;
            return response;
        } catch (error) {
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            response.message = CONSTANTS.SERVER_ERROR;
            return response;
        }
    }

    // Update Categories
    async updateCategories(req) {
        const response = {};
        try {
            const id = req.params.id;

            const { category_name, active } = req.body;

            const existingCategory = await this.categoryRepo.findCategoryByNameExcludingId(category_name, id);

            if (existingCategory) {
                response.message = `The category '${category_name}' already exists`;
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            const updatedCategory = {
                category_name,
                active,
            };

            const updatedCategoryMessage = await this.categoryRepo.UpdateCategory(id, updatedCategory);

            if (!updatedCategoryMessage) {
                response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }

            (response.message = CONSTANTS.CATEGORY_UPDATED_SUCCESS), (response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE);
            return response;
        } catch (error) {
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            response.message = CONSTANTS.SERVER_ERROR;
            return response;
        }
    }

    // Delete a Categories
    async deleteCategories(req) {
        const response = {};

        try {
            const categoryId = req.params.id;
            const deletedCategory = await this.categoryRepo.DeleteCategory(categoryId);

            console.log(!deletedCategory);

            if (!deletedCategory) {
                response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }

            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = CONSTANTS.CATEGORY_DELETED_SUCCESS;
            return response;
        } catch (error) {
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            response.message = CONSTANTS.SERVER_ERROR;
            return response;
        }
    }
}

module.exports = { CategoriesService };
