const express = require("express");
const { ProductModel } = require("../model/products.model");
const productRouter = express.Router();

///////////////////////accessible to general user//////////////////////////////////////////////
productRouter.get("/", async (req, res) => {
  try {
    const posts = await ProductModel.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await ProductModel.find({ _id: id });
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

////////////////////////////only accessible to admin/////////////////////////////////////////

productRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = new ProductModel(payload);
    await product.save();
    res.status(200).send({ msg: "product posted" });
  } catch (err) {
    res.status(400).send({ msg: "something went wrong", err: err.message });
  }
});

productRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await ProductModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "Product is updated" });
  } catch (err) {
    res.send({ msg: "Please login" });
  }
});

productRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await ProductModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Product is deleted" });
  } catch (err) {
    res.send({ msg: "Please login" });
  }
});

module.exports = { productRouter };
