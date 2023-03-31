const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userName: { type: String, required: true },
  review: { type: String, required: true },
  productID: { type: String, required: true },
  // admin_id: { type: String, required: true }
});

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = { ReviewModel };
