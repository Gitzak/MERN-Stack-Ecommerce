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

      if (!subCategory_name || !category_id || !active) {
        response.message = CONSTANTS.FIELD_EMPTY;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }

      const newsubCategory = {
        subCategory_name,
        category_id,
        active,
      };

      const subcategory = await this.subcategoryRepo.CreatesubCategory(
        newsubCategory
      );

      if (!subcategory) {
        response.message = CONSTANTS.SERVER_ERROR_MESSAGE;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return response;
      }

      response.message = CONSTANTS.CATEGORY_CREATED;
      response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
      return response;
    } catch {
      response.message = error.message;
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
    // console.log("page", page);
    // console.log("sort", sort);
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    if (query) {
      try {
        const searchedsubCategories =
          await this.subcategoryRepo.searchsubCategories(query, skip, limit, sort);
        if (!searchedsubCategories) {
          response.message = CONSTANTS.CATEGORY_NOT_FOUND;
          response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
          return response;
        }
        return searchedsubCategories;
      } catch (error) {
        response.message = error.message;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return response;
      }
    } else {
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      const subcategories = await this.subcategoryRepo.getsubCategories(
        skip,
        limit,
        sort
      );
      response.subcategories = subcategories;
      return response;
    }
  }

  // Get one subCategory by its ID
  async getsubCategoryById(req) {
    const response = {};
    try {
      const subcategoryId = req.params.id;
      const foundedsubCategory = await this.subcategoryRepo.findsubCategoryById(
        subcategoryId
      );

      if (!foundedsubCategory) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }
      return foundedsubCategory;
    } catch (error) {
      response.message = error.message;
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

      const updatedsubCategory = {
        subCategory_name,
        category_id,
        active,
      };

      const updatedsubCategoryMessage =
        await this.subcategoryRepo.UpdatesubCategory(id, updatedsubCategory);

      if (!updatedsubCategoryMessage) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }

      (response.message = CONSTANTS.CATEGORY_UPDATED),
        (response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE);
      return response;
    } catch (error) {
      response.message = error.message;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }

  // Delete a subCategories
  async deletesubCategories(req) {
    const response = {};

    try {
      const subcategoryId = req.params.id;
      // console.log(subcategoryId)
      const deletedsubCategory = await this.subcategoryRepo.DeletesubCategory(
        subcategoryId
      );

      if (!deletedsubCategory) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }

      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      response.message = CONSTANTS.CATEGORY_DELETED;
      return response;
    } catch (error) {
      response.message = error.message;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }
}

module.exports = { subCategoriesService };
