const express = require("express");
const { UserModel } = require("../model/users.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordRegulate } = require("../middleware/password.regulate");

////////////////////////////User list///////////////////////////////////////////

userRouter.get("/", async (req, res) => {
  //use it in backend
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

userRouter.get("/:id", async (req, res) => {
  //use it in backend
  const id = req.params.id;
  try {
    const users = await UserModel.find({ _id: id });
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

/////////////////sign up feature for users ////////////////////////////

userRouter.post("/register", passwordRegulate, async (req, res) => {
  const { first_name, last_name, email_address, password, date_of_birth } =
    req.body;
  bcrypt.hash(password, 8, async function (err, hash) {
    if (hash) {
      try {
        const user = new UserModel({
          first_name,
          last_name,
          email_address,
          password: hash,
          date_of_birth,
        });
        await user.save();
        res.status(200).send({ msg: "User is created" });
      }
      catch (err) {
        res.status(400).send({ msg: "Something went wrong. Please try again.", err: err.message });
      }
    } else {
      res.status(400).send({ msg: "Something went wrong. Please try again." });
    }
  });
});

///////////////////Log in feature of users////////////////////////////

userRouter.post("/login", async (req, res) => {
  const { email_address, password } = req.body;
  try {
    const user = await UserModel.find({ email_address: email_address });
    bcrypt.compare(password, user[0].password, function (err, result) {
      if (result) {
        try {
          const token = jwt.sign(
            { userID: user[0]._id, name: user[0].first_name }, //check decoded for userID and name
            "bruce"
          );

          res
            .status(200)
            .json({ msg: "User logged in", token: token, userID: user[0]._id });
        }
        catch (err) {
          res.status(400).json({ msg: "Wrong credentials", err: err.message });
        }
      } else {
        res.status(400).json({ msg: "Wrong credentials" });
      }
    })
  }
  catch (err) {
      res.json(err.message)
    }

  });

module.exports = { userRouter };
