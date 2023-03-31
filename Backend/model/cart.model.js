const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productID: { type: String, required: true },
  userID: { type: String, required: true },
  // admin_id: { type: String, required: true }
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
