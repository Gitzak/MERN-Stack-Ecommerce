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
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("subCategories", subCategoriesSchema);
