const express = require("express");
const { CartModel } = require("../model/cart.model");
const cartRouter = express.Router();
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/user.authorize");

///////////////////////accessible to general user//////////////////////////////////////////////
cartRouter.get("/", auth, async (req, res) => {
  //get userID of logged in person

  const token = req.headers.authorization;

  const decoded = jwt.verify(token, "bruce");
  try {
    const cart = await CartModel.find({ userID: decoded.userID });
    res.status(200).send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.post("/add", auth, async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "bruce");
  payload.userID = decoded.userID; //username is added
  //console.log(req.body);
  payload.productID = req.body._id;
  try {
    const product = new CartModel(payload);
    await product.save();
    res.status(200).send({ msg: "product added to cart" });
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.delete("/delete/:id", auth, async (req, res) => {
  const id = req.params.id; // add id of cart item in params in frontend when delete is clicked

  try {
    await CartModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Item is removed from cart" });
  } catch (err) {
    res.send({ msg: "Something went wrong, please try again" });
  }
});

module.exports = { cartRouter };
