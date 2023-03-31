const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  details: { type: String, required: true },
  rating: { type: String, required: true },
  price: { type: Number, required: true },
  sizing: { type: Object, required: true },
  // admin_id: { type: String, required: true }
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
