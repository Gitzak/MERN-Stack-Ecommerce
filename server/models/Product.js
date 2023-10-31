const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subCategories',
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  options: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Product', productSchema);
