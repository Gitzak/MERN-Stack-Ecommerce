const CONSTANTS = require("../constants/index");

class CategoryRepository {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async RegisterCategory(category) {
    const { category_name, active } = category;

    const createCategory = await this.categoryModel.create({
      category_name,
      active
    });


    return createCategory;
  }

  async searchCategories(query) {
    try {
      const searchedCategorys = await this.categoryModel.find({
        $or: [
          { category_name: { $regex: query, $options: "i" } },
          { active: { $regex: query, $options: "i" } },
        ],
      });
      return searchedCategorys;
    } catch (error) {
      throw error;
    }
  }

  async getCategories(skip, limit, sort) {
    const categorys = await this.categoryModel
      .aggregate([{ $sort: { category_name: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();
    console.log(categorys.length);
    return categorys;
  }


  async findCategoryById(categoryId) {
    const category = await this.categoryModel.findById(categoryId);
    return category;
  }


  async UpdateCategory(id, category) {
    const filter = { _id: id };

    const result = await this.categoryModel.findOneAndUpdate({ _id: id }, category, { upsert: true, new: true });

    if (result) {
      return {
        message: CONSTANTS.USER_UPDATED,
        status: CONSTANTS.SERVER_UPDATED_HTTP_CODE,
      };
    } else {
      return {
        message: CONSTANTS.USER_NOT_FOUND,
        status: CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE,
      };
    }
  }


  async Delete(categoryId) {
    const category = await this.categoryModel.findByIdAndDelete(categoryId);
    return category;
  }
 
}

module.exports = { CategoryRepository };
