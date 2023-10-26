const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  subcategory_id: {
    type: String,
    required: true,
  },
  short_description: {
    type: String, 
    required: true,
  },
  long_description: {
    type: String, 
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
  },
  options: {
    type: Buffer, 
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Product', productSchema);
