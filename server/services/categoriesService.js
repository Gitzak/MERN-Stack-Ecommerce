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

      if (!category_name || !active) {
        response.message = CONSTANTS.FIELD_EMPTY;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }

      const newCategory = {
        category_name,
        active,
      };

      const category = await this.categoryRepo.CreateCategory(newCategory);

      if (!category) {
        response.message = CONSTANTS.SERVER_ERROR_MESSAGE
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE
        return response;
      }

      response.message = CONSTANTS.CATEGORY_CREATED
      response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE
      return response;
    } catch {
      response.message = error.message
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }

  // Get and search for all Categories
  async getCategories(req) {
    const query = req.query.query;
    const response = {}
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || "ASC";
    // console.log("page", page);
    // console.log("sort", sort);
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    if (query) {
      try {
        const searchedCategories = await this.categoryRepo.searchCategories(
          query, skip, limit, sort
        );
        if (!searchedCategories) {
          response.message = CONSTANTS.CATEGORY_NOT_FOUND
          response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE
          return response
        }
        return searchedCategories;

      } catch (error) {
        response.message = error.message
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return response;
      }
    } else {
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      const categories = await this.categoryRepo.getCategories(
        skip,
        limit,
        sort
      );
      response.categories = categories;
      return response;
    }
  }

  // Get one Category by its ID
  async getCategoryById(req) {
    const response = {}
    try {
      const categoryId = req.params.id;
      const foundedCategory = await this.categoryRepo.findCategoryById(categoryId);

      if (!foundedCategory) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }
      return foundedCategory;
    } catch (error) {
      response.message = error.message
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }

  // Update Categories
  async updateCategories(req) {
    const response = {};
    try {
      const id = req.params.id;
      const { category_name, active } = req.body;

      const updatedCategory = {
        category_name,
        active,
      };

      const updatedCategoryMessage = await this.categoryRepo.UpdateCategory(
        id,
        updatedCategory
      );

      if (!updatedCategoryMessage) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE
        return response
      }


      response.message = CONSTANTS.CATEGORY_UPDATED,
        response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE
      return response
    } catch (error) {
      response.message = error.message
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

  }

  // Delete a Categories
  async deleteCategories(req) {
    const response = {};

    try {
      const categoryId = req.params.id;
      // console.log(categoryId)
      const deletedCategory = await this.categoryRepo.DeleteCategory(categoryId);

      if (!deletedCategory) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }

      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      response.message = CONSTANTS.CATEGORY_DELETED;
      return response;
    } catch (error) {
      response.message = error.message
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }
}

module.exports = { CategoriesService };
