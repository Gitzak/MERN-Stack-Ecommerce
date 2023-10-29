const CONSTANTS = require("../constants/index");

class CategoryRepository {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }


  async CreateCategory(category) {
    const { category_name, active } = category;
    const createCategory = await this.categoryModel.create({
      category_name,
      active
    });

    return createCategory;
  }

  async getCategories(skip, limit, sort) {
    const categorys = await this.categoryModel
      .aggregate([{ $sort: { category_name: -1 } }])
    const foundedCategories = await this.categoryModel
      .aggregate([{ $sort: { creationDate: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();
    return foundedCategories;
  }

  async searchCategories(query, skip, limit, sort) {
    try {
      const queryOptions = {
        $or: [
          { category_name: { $regex: query, $options: "i" } },
        ],
      };

      const searchedCategories = await this.categoryModel
        .find(queryOptions)
        .sort({ category_name: sort === "ASC" ? 1 : -1 })
        .skip(skip)
        .limit(limit);

      return searchedCategories;
    } catch (error) {
      throw error;
    }
  }


  async findCategoryById(categoryId) {
    const category = await this.categoryModel.findById(categoryId);
    return category;
    const foundedCategory = await this.categoryModel.findById(categoryId).select("-password");
    return foundedCategory;
  }


  async UpdateCategory(id, category) {
    const updatedCategory = await this.categoryModel.findOneAndUpdate({ _id: id }, category, { upsert: true, new: true });
    return updatedCategory
  }


  async DeleteCategory(categoryId) {
    console.log("repo",categoryId)
    const deletedCategory = await this.categoryModel.findByIdAndDelete(categoryId);
    return deletedCategory;
  }
 
}

module.exports = { CategoryRepository };
