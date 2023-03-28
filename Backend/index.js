const express = require("express");
const cors = require("cors");

const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to index page");
});

app.use("/user", userRouter);

app.listen(6060, async () => {
  try {
    await connection;
    console.log("DB is connected to server");
  } catch (err) {
    console.log(err);
  }
  console.log("Server is running at port 6060");
});
