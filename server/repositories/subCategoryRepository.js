const CONSTANTS = require("../constants/index");

class subCategoryRepository {
  constructor(subcategoryModel) {
    this.subcategoryModel = subcategoryModel;
  }


  async CreatesubCategory(subcategory) {
    const { subCategory_name, category_id, active } = subcategory;
    const createsubCategory = await this.subcategoryModel.create({
      subCategory_name,
      category_id,
      active
    });

    return createsubCategory;
  }


  async searchsubCategories(query) {
    const searchedsubCategories = await this.subcategoryModel.find({
      $or: [
        { subCategory_name: { $regex: query, $options: "i" } },
        { category_id: { $regex: query, $options: "i" } },
      ],
    });

    return searchedsubCategories;
  }

  async getsubCategories(skip, limit, sort) {
    // const subcategorys = await this.subcategoryModel
    //   .aggregate([{ $sort: { subCategory_name: -1 } }])
    const foundedsubCategories = await this.subcategoryModel
      .aggregate([{ $sort: { subCategory_name: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();
    return foundedsubCategories;
  }


  async findsubCategoryById(subcategoryId) {
    const subcategory = await this.subcategoryModel.findById(subcategoryId);
    return subcategory;
    // const foundedsubCategory = await this.subcategoryModel.findById(subcategoryId).select("-password");
    // return foundedsubCategory;
  }


  async UpdatesubCategory(id, subcategory) {
    const updatedsubCategory = await this.subcategoryModel.findOneAndUpdate({ _id: id }, subcategory, { upsert: false, new: true });
    return updatedsubCategory
  }


  async DeletesubCategory(subcategoryId) {
    console.log("repo",subcategoryId)
    const deletedsubCategory = await this.subcategoryModel.findByIdAndDelete(subcategoryId);
    return deletedsubCategory;
  }
 
}

module.exports = { subCategoryRepository };
