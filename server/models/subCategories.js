const mongoose = require("mongoose");

const subCategoriesSchema = new mongoose.Schema({
  subCategory_name: {
    type: String,
    required: true,
  },

  active: {
    type: Boolean,
    default: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },

});

module.exports = mongoose.model("subCategories", subCategoriesSchema);
