const express = require("express");
const { ReviewModel } = require("../model/review.mode");
const reviewRouter = express.Router();
const jwt = require("jsonwebtoken");

reviewRouter.get("/", async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.send(reviews);
  } catch (err) {
    res.send(err);
  }
});

reviewRouter.post("/add", async (req, res) => {
  // add review after order is done. provide a feedback form in user account for each product
  const payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "bruce");
  payload.userName = decoded.name; //username is added
  // const productID = sessionStorage.getItem("productID")

  try {
    const review = new ReviewModel(payload);
    await review.save();
    res.send("review added successfully");
  } catch (err) {
    res.send(err);
  }
});

module.exports = { reviewRouter };
