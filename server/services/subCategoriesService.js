const CONSTANTS = require("../constants");
const config = require("../config/keys");

class subCategoriesService {
    constructor(subcategoryRepo) {
        this.subcategoryRepo = subcategoryRepo;
    }

    // Create new subcategory
    async createsubCategories(req) {
        const response = {};

        try {
            const { subCategory_name, category_id, active } = req.body;

            const existingCategory = await this.subcategoryRepo.findSubCategoryByName(subCategory_name);


            if (existingCategory) {
                response.message = `The SubCategory '${subCategory_name}' already exists`;
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            const newsubCategory = {
                subCategory_name,
                category_id,
                active,
            };

            const subcategory = await this.subcategoryRepo.CreatesubCategory(newsubCategory);

            if (!subcategory) {
                response.message = CONSTANTS.SERVER_ERROR;
                response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
                return response;
            }

            response.message = CONSTANTS.SUBCATEGORY_CREATED_SUCCESS;
            response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
            return response;
        } catch {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    // Get and search for all subCategories
    async getsubCategories(req) {
        const query = req.query.query;
        const response = {};
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || "ASC";
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        if (query) {
            try {
                const searchedsubCategories = await this.subcategoryRepo.searchsubCategories(query, skip, limit, sort);
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                response.data = searchedsubCategories;
                return response;
            } catch (error) {
                response.message = error.message;
                response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
                return response;
            }
        } else {
            const subcategories = await this.subcategoryRepo.getsubCategories(skip, limit, sort);
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = subcategories;
            return response;
        }
    }

    // Get one subCategory by its ID
    async getsubCategoryById(req) {
        const response = {};
        try {
            const subcategoryId = req.params.id;
            const foundedsubCategory = await this.subcategoryRepo.findSubCategoryById(subcategoryId);

            if (!foundedsubCategory) {
                response.message = CONSTANTS.SUBCATEGORY_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = foundedsubCategory;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async getsubCategoryNameById(id) {
        const response = {};
        try {
            const foundedsubCategory = await this.subcategoryRepo.findSubCategoryById(id);

            // console.log(!foundedsubCategory);
            
            if (!foundedsubCategory) {
                response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            const foundedsubCategoryName = foundedsubCategory.subCategory_name;
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE
            response.data = foundedsubCategoryName
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    // Update subCategories
    async updatesubCategories(req) {
        const response = {};
        try {
            const id = req.params.id;
            const { subCategory_name, category_id, active } = req.body;

            const existingSubCategory = await this.subcategoryRepo.findSubCategoryByNameExcludingId(subCategory_name, id);

            if (existingSubCategory) {
                response.message = `The subCategory '${subCategory_name}' already exists`;
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            const updatedsubCategory = {
                subCategory_name,
                category_id,
                active,
            };

            const updatedsubCategoryMessage = await this.subcategoryRepo.UpdatesubCategory(id, updatedsubCategory);

            if (!updatedsubCategoryMessage) {
                response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }

            response.message = CONSTANTS.CATEGORY_UPDATED_SUCCESS;
            response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    // Delete a subCategories
    async deletesubCategories(req) {
        const response = {};

        try {
            const subcategoryId = req.params.id;
            const deletedsubCategory = await this.subcategoryRepo.DeletesubCategory(subcategoryId);

            if (!deletedsubCategory) {
                response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = CONSTANTS.CATEGORY_DELETED_SUCCESS;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }
}

module.exports = { subCategoriesService };
