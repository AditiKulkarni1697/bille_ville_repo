const express = require("express");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../model/blacklist.model");

const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token, "middleware");
  //console.log(JSON.parse(token), "middleware");

  if (token) {
    jwt.verify(token, "bruce", (err, decoded) => {
      console.log(decoded, "decoded", "middleware");
      if (decoded) {
        next();
      } else {
        console.log("err");
        res.send(err);
      }
    });
  } else {
    res.send("err middleware");
  }
};

module.exports = { auth };
