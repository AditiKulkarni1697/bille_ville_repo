const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
const { orderRouter } = require("./routes/order.routes");
const { blacklistRouter } = require("./routes/blacklist.routes");
const app = express();
app.use(express.json());
app.options('*', cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.get("/", (req, res) => {
  res.send("Welcome to index page");
});

app.use("/user", userRouter); //register,login      // no login needed
app.use("/product", productRouter); //product get,add,update,delete  // for add,update,delete need admin login
app.use("/cart", cartRouter); // cart get,add,delete  //need regular user login
app.use("/order", orderRouter);
app.use("/blacklist", blacklistRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB is connected to server");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
