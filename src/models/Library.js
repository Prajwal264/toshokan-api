const mongoose = require("mongoose");

const model = mongoose.model("Library", {
  identifier: String,
  admin: String,
  name: String,
  bio: String,
  image: String,
});

module.exports = model;
