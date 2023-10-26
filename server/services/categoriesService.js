const CONSTANTS = require("../constants");
const config = require("./../config/keys");

class CategoriesService {
  constructor(categoryRepo) {
    this.categoryRepo = categoryRepo;
  }


  async createCategories(req) {
    const response = {};

    const { category_name, active } = req.body;

    //todo: we must add validation
    if (!category_name || !active ) {
      response.message = CONSTANTS.FIELD_EMPTY;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      return response;
    }

    const newCategory = {
      category_name,
       active
    };

    const category = await this.categoryRepo.RegisterCategory(newCategory);

    if (!category) {
      response.message = CONSTANTS.SERVER_ERROR_MESSAGE;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

    response.message = CONSTANTS.USER_CREATED;
    response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
    // response.data = category;
    return response;
  }
  
  async getCategories(req) {
    const query = req.query.query
    if (query) {
      try {
        const searchCategories = await this.categoryRepo.searchCategories(query);
        return searchCategories;
      } catch (error) {
        return error;
      }
    } else {
      const page = parseInt(req.query.page) || 1;
      const sort = req.query.sort || "ASC";
      console.log("page", page);
      console.log("sort", sort);
      const pageSize = 10; // Number of items per page
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      const response = {};
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      const categories = await this.categoryRepo.getCategories(skip, limit, sort);
      response.categories = categories;
      return response;
    }
  }

  async getCategoriesById(req) {
    try {
      const categoryId = req.params.id;
      const category = await this.categoryRepo.findCategoryById(categoryId);
      if (category === null || category === undefined) {
        // If category is not found, return a meaningful response
        return { message: 'Category not found', status: 404 };
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  // Delete a Categories
  async updateCategories(req) {
    const id = req.params.id;

    const response = {};

    const { category_name, active } = req.body;

    const updatedCategory = {
        category_name,
        active,
    };

    const updatedCategoryMessage = await this.customerRepo.UpdateCustomer(
      id,
      updatedCategory
    );

    response.message = updatedCategoryMessage;

    return response;
  }

  // Delete a Categories
  async deleteCategories(req) {
    const response = {};

    try {
      const categoryId = req.params.id;
      const deletedCategory = await this.categoriesRepo.DeleteCategory(categoryId);

      if (!deletedCategory) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      response.message = CONSTANTS.CATEGORY_DELETED;
      return response;

    } catch (error) {
      response.message = "An error occurred while deleting the customer.";
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      console.error(error);
    }
  }



}

module.exports = { CategoriesService };
