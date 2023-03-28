const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://aditi:aditi@cluster0.bxaz2tg.mongodb.net/cloneusers?retryWrites=true&w=majority"
);

module.exports = { connection };
