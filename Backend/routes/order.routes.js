const express = require("express");
const { OrderModel } = require("../model/order.model");
const orderRouter = express.Router();

///////////////////////accessible to general user//////////////////////////////////////////////
orderRouter.get("/", async (req, res) => {
  try {
    const posts = await OrderModel.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

orderRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await OrderModel.find({ _id: id });
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

////////////////////////////only accessible to admin/////////////////////////////////////////

orderRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = new OrderModel(payload);
    await product.save();
    res.status(200).send({ msg: "order posted" });
  } catch (err) {
    res.status(400).send({ msg: "something went wrong" });
  }
});

// orderRouter.patch("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   const payload = req.body;
//   try {
//     await OrderModel.findByIdAndUpdate({ _id: id }, payload);
//     res.status(200).send({ msg: "Order is updated" });
//   } catch (err) {
//     res.send({ msg: "Please login" });
//   }
// });

// orderRouter.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     await OrderModel.findByIdAndDelete({ _id: id });
//     res.status(200).send({ msg: "Order is deleted" });
//   } catch (err) {
//     res.send({ msg: "Please login" });
//   }
// });

module.exports = { orderRouter };
