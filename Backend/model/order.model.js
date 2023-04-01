const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  sizing: { type: String, required: true },
  price: { type: Number, required: true },
  estimated_Delivery: { type: String, required: true },
  productID: { type: String, required: true },
  userID: { type: String, required: true },
  // admin_id: { type: String, required: true }
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
