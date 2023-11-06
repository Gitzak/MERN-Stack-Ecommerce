const CONSTANTS = require("../constants/index");

class subCategoryRepository {
    constructor(subcategoryModel, categoryModel) {
        this.subcategoryModel = subcategoryModel;
        this.categoryModel = categoryModel;
    }

    async CreatesubCategory(subcategory) {
        const { subCategory_name, category_id, active } = subcategory;
        const createsubCategory = await this.subcategoryModel.create({
            subCategory_name,
            category_id,
            active,
        });
        return createsubCategory;
    }

    async searchsubCategories(query, skip, limit, sort) {
        const queryOptions = {
            $or: [{ subCategory_name: { $regex: query, $options: "i" } }],
        };

        const searchedSubCategories = await this.subcategoryModel
            .find(queryOptions)
            .sort({ category_name: sort === "ASC" ? 1 : -1 })
            .skip(skip)
            .limit(limit)
            .populate("category_id")
            .exec();

        return searchedSubCategories;
    }

    async getsubCategories(skip, limit, sort) {
        const foundedsubCategories = await this.subcategoryModel
            .find()
            .sort({ subCategory_name: sort === "ASC" ? 1 : -1 })
            .skip(skip)
            .limit(limit)
            .populate("category_id") // Populate the category data
            .exec();

        return foundedsubCategories;
    }

    async findSubCategoryByName(category_name) {
        const category = await this.subcategoryModel.findOne({ subCategory_name: category_name });
        return category;
    }

    async findSubCategoryById(subcategoryId) {
        const subcategory = await this.subcategoryModel.findById(subcategoryId).populate("category_id").exec();
        return subcategory;
    }

    async findSubCategoryByNameExcludingId(subCategory_name, excludeId) {
        const subCategory = await this.subcategoryModel.findOne({ subCategory_name: subCategory_name, _id: { $ne: excludeId } });
        return subCategory;
    }

    async UpdatesubCategory(id, subcategory) {
        const updatedsubCategory = await this.subcategoryModel.findOneAndUpdate({ _id: id }, subcategory, { upsert: false, new: true });
        return updatedsubCategory;
    }

    async DeletesubCategory(subcategoryId) {
        // console.log("repo", subcategoryId)
        const deletedsubCategory = await this.subcategoryModel.findByIdAndDelete(subcategoryId);
        return deletedsubCategory;
    }
}

module.exports = { subCategoryRepository };
