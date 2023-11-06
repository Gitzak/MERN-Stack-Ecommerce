const CONSTANTS = require("../constants/index");

class CategoryRepository {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    async CreateCategory(category) {
        const { category_name, active } = category;
        const createCategory = await this.categoryModel.create(category);
        return createCategory;
    }

    async getCategories(skip, limit, sort) {
        const foundedCategories = await this.categoryModel
            .aggregate([{ $sort: { category_name: -1 } }])
            .skip(skip)
            .limit(limit)
            .exec();
        return foundedCategories;
    }

    async searchCategories(query, skip, limit, sort) {
        const queryOptions = {
            $or: [{ category_name: { $regex: query, $options: "i" } }],
        };

        const searchedCategories = await this.categoryModel
            .find(queryOptions)
            .sort({ category_name: sort === "ASC" ? 1 : -1 })
            .skip(skip)
            .limit(limit);

        return searchedCategories;
    }

    async findCategoryById(categoryId) {
        const category = await this.categoryModel.findById(categoryId);
        return category;
    }

    async findCategoryByName(category_name) {
        const category = await this.categoryModel.findOne({ category_name: category_name });
        return category;
    }

    async findCategoryByNameExcludingId(category_name, excludeId) {
        const category = await this.categoryModel.findOne({ category_name: category_name, _id: { $ne: excludeId } });
        return category;
    }

    async hasChildCategories(categoryId) {
        const childCategories = await this.categoryModel.find({ parentId: categoryId });
        return childCategories.length > 0;
    }

    async UpdateCategory(id, category) {
        const updatedCategory = await this.categoryModel.findOneAndUpdate({ _id: id }, category, { upsert: false, new: true });
        return updatedCategory;
    }

    async DeleteCategory(categoryId) {
        const deletedCategory = await this.categoryModel.findByIdAndDelete(categoryId);
        return deletedCategory;
    }
}

module.exports = { CategoryRepository };
